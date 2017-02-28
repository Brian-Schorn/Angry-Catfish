/**
 * Handles all authentication requests including
 * login and logout.
 *
 * @module routes/auth
 */
var express = require('express');
var router = express.Router();
var passport = require('../auth/passport');
/**
 * GET /auth/google
 *
 * Ask user to authenticate with Google and authorize our app for provided scopes
 * (aka the permissions/APIs app will need). User will be prompted
 * to select a Google account.
 *
 * We are using the Google Calendar API in this example.
 * See {@link https://developers.google.com/identity/protocols/googlescopes}
 * for more available scopes.
 *
 * See {@link https://developers.google.com/identity/protocols/OpenIDConnect#authenticationuriparameters}
 * for info on more authentication parameters that might be used here.
 */
router.get('/google', passport.authenticate('google',
  {
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'],
    prompt: 'select_account',
  })
);
/**
 * GET /auth/google/callback
 *
 * The callback after Google has authenticated the user with GET /auth/google.
 * Provides us with user profile info.
 *
 * IMPORTANT: URL--the first parameter below--must match
 * callbackUrl in {@link config/auth}.
 */
router.get('/google/callback', passport.authenticate('google',
  {
    successRedirect: '/private', // take them to their private data
    failureRedirect: '/', // take them back home to try again
  })
);
/**
 * GET /auth
 *
 * Is this request coming from a logged in user?
 *
 * @return JSON object with status (true or false) and, if true, user's name
 */
router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.json({ status: true, name: req.user.googleName });
  } else {
    res.json({ status: false });
  }

});
/**
 * GET /auth/logout
 *
 * Logs out user on the server by removing the passport session.
 *
 * @return 200 - OK
 */
router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200); // they made it!
});

module.exports = router;
