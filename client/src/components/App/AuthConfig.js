import { LogLevel } from '@azure/msal-browser';
const { NODE_ENV } = process.env;

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
        // Don't show logger output if it contains PII
        if (containsPii) {
          return;
        }
        // When in Dev
        if (NODE_ENV === 'development') {
          switch (level) {
            case LogLevel.Error:
              return console.error(message);
            case LogLevel.Info:
              return console.info(message);
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              return console.warn(message);
            default:
              return;
          }
          // When in Prod
        } else if (level === LogLevel.Error) {
          return console.error(message);
        }
      },
      logLevel: NODE_ENV === 'development' ? LogLevel.Verbose : LogLevel.Error,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.REACT_APP_AAD_CLIENT_ID}/Users`],
};
