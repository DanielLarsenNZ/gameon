import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../components/Landing';

const loading = () => <div></div>;

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

class Routes extends Component {
  getLayout = () => {
    return HorizontalLayout;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <BrowserRouter>
        <Layout {...this.props}>
          <Switch>
            <Route path="/" component={Landing} />
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
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Routes;
