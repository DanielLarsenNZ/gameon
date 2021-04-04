import { useIsAuthenticated } from '@azure/msal-react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DevToken from '../components/DevToken';
import FAQ from '../components/FAQs';
import Home from '../components/Home';
import Landing from '../components/Landing';
import Login from '../components/Login/Login';
import Logout from '../components/Logout';
import Tournament from '../components/Tournament';
import EditTournament from '../components/Tournament/Edit';
import AuthLayout from '../layouts/Auth';
import HorizontalLayout from '../layouts/Horizontal';
import { Error404 } from './Error';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

const Routes = () => {
  const isAuthenticated = useIsAuthenticated();
  const HomeRoute = () => (isAuthenticated ? <Home /> : <Landing />);

  const getLayout = () => {
    if (!isAuthenticated) return AuthLayout;
    return HorizontalLayout;
  };

  const Layout = getLayout();

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/tournaments/:id" component={Tournament} />
          <Route exact path="/tournaments/:id/manage/:active_tab?" component={EditTournament} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/developer" component={DevToken} />

          {/* {routes.map((route, index) => {
              return !route.children ? (
                <route.route
                key={index}
                path={route.path}
                roles={route.roles}
                exact={route.exact}
                component={route.component}></route.route>
                ) : null;
              })} */}
          <Route component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
