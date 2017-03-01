angryCatfishApp.controller('testController', function ($http, BikeService, ReservationService) {
  console.log('loaded Test Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.getBikes = bikeService.getBikes;
  _this.getReservations = reservationService.getReservations;


});
