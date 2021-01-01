import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FAQ from '../components/FAQs';
import Landing from '../components/Landing';
import Tournament from '../components/Tournament';
import Error404 from './Error404';

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/tournaments/:id" component={Tournament} />
            <Route exact path="/faq" component={FAQ} />

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
  }
}

export default Routes;
