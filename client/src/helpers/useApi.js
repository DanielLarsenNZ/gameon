import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useAccount, useMsal } from '@azure/msal-react';
import { useEffect, useReducer, useRef } from 'react';

const { REACT_APP_API_URI, REACT_APP_AAD_CLIENT_ID } = process.env;

/**
 * Queries a given endpoint of the Game On API.
 * @param {String} uri Endpoint to query
 * @returns data = [], status = 'idle', error = null
 */
const useAPI = (uri) => {
  // Request Stores
  const cache = useRef({});
  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  // State Reducer
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  // Authentication
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  // When called:
  useEffect(() => {
    let cancelRequest = false;
    if (!uri) return;

    /**
     * Send request to resource
     * @param {String} accessToken MSAL Access Token
     */
    const fetchData = async (accessToken) => {
      // Fetch Options
      const headers = new Headers();
      const bearer = `Bearer ${accessToken}`;

      headers.append('Authorization', bearer);

      // Request options
      const options = {
        headers: headers,
      };

      dispatch({ type: 'FETCHING' });

      // Check Cache
      if (cache.current[uri]) {
        const data = cache.current[uri];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await fetch(`${REACT_APP_API_URI}${uri}`, options);
          const data = await response.json();

          cache.current[uri] = data; // Cache response
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    if (account) {
      instance
        .acquireTokenSilent({
          scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
          account: account,
        })
        .then((response) => fetchData(response.accessToken))
        .catch((error) => {
          console.error(error);
          if (error instanceof InteractionRequiredAuthError) {
            return instance.acquireTokenRedirect({
              scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
              account: account,
            });
          }
        });
    }

    return function cleanup() {
      cancelRequest = true;
    };
  }, [uri, account, instance]);

  return state;
};

export { useAPI };
