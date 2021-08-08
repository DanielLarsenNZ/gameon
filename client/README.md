# Game On! Web Application

> 🌐 <https://gameon.nz>

This web application is the primary interface for Game On! - through which tournaments are managed, results are submitted, and leaderboards visualised.

![Concept](https://i.imgur.com/9gqe6Wn.png)

## Getting Up and Running

### Development Environment

1. Using the Terminal, switch into this directory using `$ cd /client`
2. Start the React project in development mode (incl. Hot Loading) using `$ npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Customise Environment Variables for Local Development

1. In this `client` directory, create a file called `.env.local`
2. Paste the following variables and adjust as required:

```javascript
REACT_APP_AAD_REDIRECT_URI='https://localhost:3000/login'
REACT_APP_AAD_POST_LOGOUT_REDIRECT_URI='https://localhost:3000'
REACT_APP_API_URI='https://api.gameon.nz' // or localhost address

HTTPS=true
```

Any variables defined in `.env` can be customised in `.env.local` to meet local development needs.

### Production Environment

1. Using the Terminal, switch into this directory using `$ cd /client`
2. In the console: `$ npm run build` to compile the React code.
3. Serve the newly created `./build` folder (entrypoint: `index.html`) using your preferred web server.

Find out more about deploying a React application [at this link](https://create-react-app.dev/docs/deployment) (also contains a [section on Azure](https://create-react-app.dev/docs/deployment/#azure) deployment).
