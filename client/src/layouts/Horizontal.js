import React, { Suspense, useState } from 'react';
import { Container } from 'reactstrap';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Navigation = React.lazy(() => import('../components/Navigation'));
const loading = () => <Loader />;

const HorizontalLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const children = children || null;

  return (
    <>
      <div id="wrapper">
        <Suspense fallback={loading()}>
          <Navigation openLeftMenuCallBack={() => setIsMenuOpen(!isMenuOpen)} />
        </Suspense>
        {/* <Suspense fallback={loading()}>
          <Navbar isMenuOpened={isMenuOpen} {...this.props} />
        </Suspense> */}

        <div className="content-page">
          <div className="content">
            <Container fluid>
              <Suspense fallback={loading()}>{children}</Suspense>
            </Container>
          </div>

          <Suspense fallback={loading()}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HorizontalLayout;
