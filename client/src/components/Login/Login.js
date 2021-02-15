import { useAccount, useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../Loader';

const { REACT_APP_API_URI, REACT_APP_AAD_CLIENT_ID } = process.env;

// Login or Register the User in GameOn using their tenant details from claims
const loginOrRegister = async (accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'POST',
    headers: headers,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/me`, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

const Login = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
          account: account,
        })
        .then((response) => {
          if (response) {
            loginOrRegister(response.accessToken)
              .then((result) => setApiData(result))
              .catch((err) => console.log(err));
          }
        })
        .catch(function (error) {
          // TODO: Acquire token silent failure, and send an interactive request
          console.log(error);
          if (error.errorMessage.indexOf('interaction_required') !== -1) {
            instance.acquireTokenRedirect({
              scopes: ['api://GameOn.Api/Users'],
              account: account,
            });
          }
        });
    }
  }, [account, instance]);

  if (accounts.length > 0 && apiData) {
    // Take Home once Authed
    return <Redirect to="/" />;
  } else if (inProgress === 'login' || !apiData) {
    return <Loader />;
  } else {
    // Microsoft Authentication Experience
    return instance.loginRedirect();
  }
};

export default Login;
