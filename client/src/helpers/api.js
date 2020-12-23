// import { useEffect, useState } from 'react';

// /**
//  * Fetch data from the URL
//  * @param {*} url
//  * @param {*} options
//  */
// const fetchJSON = (url, options = {}) => {
//   return fetch(url, options)
//     .then((response) => {
//       if (!response.status === 200) {
//         throw response.json();
//       }
//       return response.json();
//     })
//     .then((json) => {
//       return json;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export { fetchJSON };

// export const apiStates = {
//   LOADING: 'LOADING',
//   SUCCESS: 'SUCCESS',
//   ERROR: 'ERROR',
// };

// export const useAPI = (url) => {
//   const [data, setData] = useState({ state: apiStates.LOADING, error: '', data: [] });

//   const setPartData = (partialData) => setData({ ...data, ...partialData });

//   useEffect(() => {
//     setPartData({ state: apiStates.LOADING });

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setPartData({ state: apiStates.SUCCESS, data }))
//       .catch(() => setPartData({ state: apiStates.ERROR, error: 'fetch failed' }));
//   }, []);

//   return data;
// };

import { useEffect, useRef, useReducer } from 'react';

export const useFetch = (url, options = {}) => {
  const cache = useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

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

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
