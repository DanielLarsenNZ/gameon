import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import Routes from '../../routes/Routes';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { config as i18nextConfig } from '../../translations';

import '../../assets/scss/theme.scss';

i18n.use(LanguageDetector).use(initReactI18next).init(i18nextConfig);

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
