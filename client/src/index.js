import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, UnauthenticatedTemplate, MsalAuthenticationTemplate } from '@azure/msal-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { msalConfig } from './components/App/AuthConfig';
import reportWebVitals from './reportWebVitals';

const msalInstance = new PublicClientApplication(msalConfig);

const InProgressComponent = ({ inProgress }) => {
  return (
    <div className="preloader">
      <div className="status">
        <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>
      </div>
    </div>
  );
};

const ErrorComponent = ({ error }) => {
  return (
    <h5>
      This is a protected page and the following error occurred during authentication:{' '}
      <strong>{error.errorCode}</strong>
    </h5>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType="redirect"
        loadingComponent={InProgressComponent}
        errorComponent={ErrorComponent}>
        <App />
      </MsalAuthenticationTemplate>
      <UnauthenticatedTemplate>
        <h5 className="card-title">Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
