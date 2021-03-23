import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../routes/Routes';
import { config as i18nextConfig } from '../../translations';
import { ProvideProfile } from './Profile';
import '../../assets/scss/theme.scss';

i18n.use(LanguageDetector).use(initReactI18next).init(i18nextConfig);

const App = () => {
  return (
    <>
      <ProvideProfile>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ProvideProfile>
      <Toaster />
    </>
  );
};

export default App;
