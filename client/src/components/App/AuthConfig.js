import { LogLevel } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID,
    authority: process.env.REACT_APP_AAD_AUTHORITY,
    redirectUri: process.env.REACT_APP_AAD_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_AAD_POST_LOGOUT_REDIRECT_URI,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.REACT_APP_AAD_CLIENT_ID}/Users`, 'User.Read'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
