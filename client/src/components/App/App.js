import { NavigationClient } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { initReactI18next } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import '../../assets/scss/theme.scss';
import Routes from '../../routes/Routes';
import { config as i18nextConfig } from '../../translations';
import { ProfileProvider } from './Profile';

i18n.use(LanguageDetector).use(initReactI18next).init(i18nextConfig);

class CustomNavigationClient extends NavigationClient {
  constructor(history) {
    super();
    this.history = history; // Passed in from useHistory hook provided by react-router-dom;
  }

  /**
   * Navigates to other pages within the same web application
   * You can use the useHistory hook provided by react-router-dom to take advantage of client-side routing
   * @param url
   * @param options
   */
  async navigateInternal(url, options) {
    const relativePath = url.replace(window.location.origin, '');
    if (options.noHistory) {
      this.history.replace(relativePath);
    } else {
      this.history.push(relativePath);
    }

    return false;
  }
}

const App = ({ pca }) => {
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <ProfileProvider>
        <Routes />
      </ProfileProvider>
      <Toaster />
    </MsalProvider>
  );
};

export default App;
