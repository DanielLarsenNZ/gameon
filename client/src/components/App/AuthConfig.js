import { LogLevel } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: '73263e98-be26-450b-96cb-0ea758039fd9',
    authority: 'https://login.microsoftonline.com/organizations/',
    redirectUri: 'https://localhost:3000',
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
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read', 'https://microsoft.onmicrosoft.com/GameOn.Tournaments/user_impersonation'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
