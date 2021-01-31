import { useMsal } from '@azure/msal-react';

const Logout = () => {
  const { instance } = useMsal();
  instance.logout();
};

export default Logout;
