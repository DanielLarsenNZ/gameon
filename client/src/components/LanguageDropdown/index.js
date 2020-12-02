import React, { useState } from 'react';
import { Globe } from 'react-feather';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import deFlag from './flags/germany.jpg';
import enFlag from './flags/us.jpg';
import { useTranslation } from 'react-i18next';

const Languages = [
  {
    name: 'English',
    code: 'en',
    flag: enFlag,
  },
  {
    name: 'German',
    code: 'de',
    flag: deFlag,
  },
  {
    name: 'Maori',
    code: 'mi',
    flag: enFlag,
  },
];

const LanguageDropdown = ({ tag = 'div' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        className="d-none d-lg-block"
        tag={tag}
        id="langDropdown">
        <DropdownToggle
          data-toggle="dropdown"
          tag="a"
          className="nav-link mr-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}>
          <Globe />
        </DropdownToggle>
        <DropdownMenu right className="">
          <div onClick={() => setIsOpen(!isOpen)}>
            {Languages.map((lang, i) => {
              return (
                <Link
                  className="dropdown-item notify-item"
                  key={i + '-lang'}
                  onClick={() => i18n.changeLanguage(lang.code)}>
                  <img src={lang.flag} alt={lang.name} className="mr-1" height="12" />{' '}
                  <span className="align-middle">{lang.name}</span>
                </Link>
              );
            })}
          </div>
        </DropdownMenu>
      </Dropdown>

      <UncontrolledTooltip placement="left" target="langDropdown">
        Change language
      </UncontrolledTooltip>
    </React.Fragment>
  );
};

export default LanguageDropdown;
