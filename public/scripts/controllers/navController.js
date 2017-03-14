angryCatfishApp.controller('NavController', function (AuthFactory, ngCart, $window, UserService) {
  var _this = this;
  var authFactory = AuthFactory;

  _this.displayLogout = false; // should we display the logout option on the DOM?
  _this.message = {
    text: false,
    type: 'info',
  };

  authFactory.isLoggedIn()
  .then(function (response) {
    console.log("Response.data for logged in", response.data);
    if (response.data.status) {
      _this.displayLogout = true;
      authFactory.setLoggedIn(true);
      _this.loggedIn = authFactory.checkLoggedIn();
      console.log("Are you logged in? NAV ", _this.loggedIn);

      _this.username = response.data.name;
    } else { // is not logged in on server
      _this.displayLogout = false;
      authFactory.setLoggedIn(false);
    }
  },

  function () {
    _this.message.text = 'Unable to properly authenticate user';
    _this.message.type = 'error';
  });

  var userService = UserService;

  _this.pageLoad = false;

  _this.checkAdminStatus = function() {
        userService.getCurrentUser().then(function(res) {
         user=res.data.user;
         if(user.admin == true){
           _this.admin = true;
         }else{
           _this.admin = false;
         }
        });
      };

  _this.checkAdminStatus();
  
  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which will update our NavController
      },

      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      });
  };
});
