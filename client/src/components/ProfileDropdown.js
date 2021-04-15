import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const ProfileDropdown = ({ profilePic, menuItems, username, tag }) => {
  const { t } = useTranslation('common');

  profilePic = profilePic || null;
  tag = tag || 'div';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
      className="notification-list align-self-center profile-dropdown"
      tag={tag}>
      <DropdownToggle
        data-toggle="dropdown"
        tag="a"
        className="nav-link dropdown-toggle nav-user mr-0 mr-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}>
        <div className="media user-profile ">
          <img src={profilePic} alt={username} className="rounded-circle align-self-center" />
          <div className="media-body text-left">
            <h6 className="pro-user-name ml-2">
              <span>{username}</span>
            </h6>
          </div>
          <ChevronDown className="ml-2 align-self-center"></ChevronDown>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
        <div onClick={() => setIsOpen(!isOpen)}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={i + '-profile-menu'}>
                {item.hasDivider ? <DropdownItem divider /> : null}
                <Link to={item.redirectTo} className="dropdown-item notify-item">
                  <Icon className="icon-dual icon-xs mr-2"></Icon>
                  <span>{t(item.label)}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
