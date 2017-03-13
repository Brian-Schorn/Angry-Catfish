angryCatfishApp.controller('adminController', function (AuthFactory, $http, $scope, $timeout, $interval, $uibModalStack, BikeService, ReservationService) {
  console.log('loaded Admin Controller');
  var _this = this;

  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn();
  console.log(authFactory.checkLoggedIn());
  var bikeService = BikeService;
  var reservationService = ReservationService;



});
