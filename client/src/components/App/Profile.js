import { useAccount, useMsal } from '@azure/msal-react';
import React, { createContext, useContext } from 'react';
import { useAPI } from '../../helpers/useApi';

// Create Authentication Context
const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

// Profile Prodiver
export const ProvideProfile = ({ children }) => {
  const profile = useProvideProfile();
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};

// Business Logic
const useProvideProfile = () => {
  const { data: me, status, error } = useAPI('/me');
  return { me, status, error };
};
