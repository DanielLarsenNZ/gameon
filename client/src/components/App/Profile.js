import React, { createContext, useContext, useMemo } from 'react';
import { useAPI } from '../../helpers/useApi';

// Create Authentication Context
const ProfileContext = createContext();
// export const useProfile = () => useContext(ProfileContext);

// Profile Prodiver
export const ProfileProvider = ({ children }) => {
  const initState = { name: 'Thomas Tester', givenName: 'Thomas', surname: 'Tester', id: '0123456789' };
  const { data: me = initState } = useAPI('/me');

  const profile = useMemo(() => ({ me }), [me]);
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};

// Business Logic
// const useProvideProfile = () => {
//   const { data: me, status, error } = useAPI('/me');
//   console.log(me);
//   return { me, status, error };
// };

export const useProfile = () => useContext(ProfileContext);
