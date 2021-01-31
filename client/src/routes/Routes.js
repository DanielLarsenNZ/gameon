import { useIsAuthenticated } from '@azure/msal-react';
import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import FAQ from '../components/FAQs';
import Home from '../components/Home';
import Landing from '../components/Landing';
import Logout from '../components/Logout';
import Tournament from '../components/Tournament';
import Error404 from './Error404';

const loading = () => <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

const AuthLayout = Loadable({
  loader: () => import('../layouts/Auth'),
  render(Loaded, props) {
    let Component = Loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const HorizontalLayout = Loadable({
  loader: () => import('../layouts/Horizontal'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

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

const HomeRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Home /> : <Landing />;
};

const Routes = () => {
  const isAuthenticated = useIsAuthenticated();

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
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/logout" component={Logout} />

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
