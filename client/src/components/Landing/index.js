import { InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Collapse,
  Container,
  Jumbotron,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { useConfiguration, useFeatureFlag } from '../../helpers/useFeatureFlag';
import Loader from '../Loader';

const TopAlert = ({ color, children }) => {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <Alert
      color={color}
      isOpen={isBannerOpen}
      toggle={() => setIsBannerOpen(false)}
      className="border-0 rounded-0 text-center font-size-15">
      <strong>{children}</strong>
    </Alert>
  );
};

const Navigation = ({ login, inProgress }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="faded" light expand="lg" className="py-lg-3 mb-2">
      <div className="container">
        <NavbarBrand href="/" className="mr-auto">
          <img src={logo} alt="Logo" height="24" className="logo-dark" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />

        <Collapse isOpen={!collapsed} navbar className="font-size-16 font-weight-bold">
          <Nav navbar className="ml-auto align-items-center">
            <NavItem className="mx-lg-1">
              <NavLink href="/faq">FAQ</NavLink>
            </NavItem>
            <NavItem className="mx-lg-1 mr-0 ml-4">
              <Button onClick={() => login()} disabled={inProgress === InteractionStatus.Login}>
                Sign in
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

const Hero = () => (
  <Jumbotron>
    <Container>
      <h1 className="mb-4">Rally the troops! The Game is On!</h1>{' '}
      <p className="mb-4 font-size-20">
        Creating inter-company office tournaments has never been easier.
        <br />
        Sign in with your organisation's credentials to create your first tournament and start scoring.
      </p>
    </Container>
  </Jumbotron>
);

const Landing = () => {
  const { instance, inProgress } = useMsal();
  const { config: alertMessage } = useConfiguration('Landing:Alert');
  const { enabled: showLandingAlert } = useFeatureFlag('ShowLandingAlert');

  const showAlert = showLandingAlert && alertMessage.toString().trim().length;

  return (
    <>
      {inProgress !== InteractionStatus.None && <Loader />}
      {showAlert && <TopAlert color="success">{alertMessage}</TopAlert>}

      <Navigation login={() => instance.loginRedirect()} inProgress={inProgress} />
      <Hero />
    </>
  );
};

export default Landing;
