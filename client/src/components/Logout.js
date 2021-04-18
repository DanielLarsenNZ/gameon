import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Redirect } from 'react-router';

const Logout = ({ location }) => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Redirect to previous page or home page
  const { from } = location.state || { from: { pathname: '/' } };

  return isAuthenticated ? instance.logoutRedirect() : <Redirect to={from} />;
};

export default Logout;
