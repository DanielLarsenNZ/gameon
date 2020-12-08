import React, { useState } from 'react';
import { Globe } from 'react-feather';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import deFlag from './flags/deFlag.png';
import enFlag from './flags/gbFlag.png';
import miFlag from './flags/miFlag.png';
import { useTranslation } from 'react-i18next';

/**
 * Currently supported languages.
 * @see Icons: https://www.iconarchive.com/show/flags-icons-by-wikipedia.1.html
 */
const Languages = [
  {
    name: 'English',
    code: 'en',
    flag: enFlag,
  },
  {
    name: 'Deutsch',
    code: 'de',
    flag: deFlag,
  },
  {
    name: 'Māori',
    code: 'mi',
    flag: miFlag,
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
                  <img src={lang.flag} alt={lang.name} className="mr-1" height="20" />{' '}
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
