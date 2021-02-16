import { useAccount, useMsal } from '@azure/msal-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const { REACT_APP_API_URI, REACT_APP_AAD_CLIENT_ID } = process.env;

// Create Authentication Context
const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

// Profile Prodiver
export const ProvideProfile = ({ children }) => {
  const profile = useProvideProfile();
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};

// Get /me Profile
const getProfile = async (accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/me`, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

// TODO: Get /me Profile Picture
const getAvatar = async (accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/me/photos?size=120x120`, options);
    return response;
  } catch (error) {
    return console.log(error);
  }
};

// Business Logic
const useProvideProfile = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
          account: account,
        })
        .then((response) => {
          if (response) {
            getProfile(response.accessToken)
              .then((result) => setProfile(result))
              // .then(() => getAvatar(response.accessToken)) // FIXME: Can't get image (500 error)
              .catch((err) => console.log(err));
          }
        })
        .catch(function (error) {
          // TODO: Acquire token silent failure, and send an interactive request
          console.log(error);
          if (error.errorMessage.indexOf('interaction_required') !== -1) {
            instance.acquireTokenRedirect({
              scopes: [`${REACT_APP_AAD_CLIENT_ID}/Users`],
              account: account,
            });
          }
        });
    }
  }, [account, instance]);

  return { profile };
};
