/** Google Cloud API credentials that allows the application to
  * make calls to a Google API.
  * See {@link https://console.developers.google.com}
  * and replace each value with your own.
  * @todo replace each googleAuth value with your app's client credentials
  * @todo give yourself a unique secrect for your sessions
  * @module config/auth
  */
  var authConfigs = {
    googleAuth: {
      clientId: '935722949588-f19tn2u2eudvti35mljanmufr2eie318.apps.googleusercontent.com',
      clientSecret: 'tFKkRV-a99f6OGtpw6XS1d8O',
      callbackUrl: 'http://localhost:3000/auth/google/callback',
    },

    sessionVars: {
      secret: 'asdf',
    },
  };

module.exports = authConfigs;
