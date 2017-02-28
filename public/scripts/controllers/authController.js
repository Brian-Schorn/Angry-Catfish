googleAuthApp.controller('AuthController', function (AuthFactory) {
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
});
