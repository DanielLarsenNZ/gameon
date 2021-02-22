import React from 'react';
import { BarChart2, HelpCircle, LogOut, Menu, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import logo from '../assets/images/logo.png';
import { initialsAvatarURL } from '../helpers/Helpers';
import { useProfile } from './App/Profile';
import LanguageDropdown from './LanguageDropdown';
import ProfileDropdown from './ProfileDropdown';

const ProfileMenus = [
  {
    label: 'All Tournaments',
    icon: BarChart2,
    redirectTo: '/',
  },
  {
    label: 'FAQs',
    icon: HelpCircle,
    redirectTo: '/faq',
  },
  {
    label: 'Logout',
    icon: LogOut,
    redirectTo: '/logout',
    hasDivider: true,
  },
];

const Navigation = () => {
  const { profile = undefined } = useProfile();
  const givenName = profile?.givenName || '';
  const surname = profile?.surname || '';

  return (
    <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
      <Container fluid>
        {/* Logo */}
        <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
          <span className="logo-lg">
            <img src={logo} alt="Logo" height="24" />
            {/* <span className="d-inline h5 ml-2 text-logo">GameOn</span> */}
          </span>
          <span className="logo-sm">
            <img src={logo} alt="Logo" height="24" />
          </span>
        </Link>

        {/* Menu*/}
        <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
          <li className="">
            <button
              className="button-menu-mobile open-left disable-btn" /* onClick={this.props.openLeftMenuCallBack} */
            >
              <Menu className="menu-icon" />
              <X className="close-icon" />
            </button>
          </li>
        </ul>

        <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
          <LanguageDropdown tag="li" />
          <ProfileDropdown
            profilePic={initialsAvatarURL(givenName, surname)}
            menuItems={ProfileMenus}
            username={profile?.name}
            tag={null}
          />
        </ul>
      </Container>
    </div>
  );
};

export default Navigation;
