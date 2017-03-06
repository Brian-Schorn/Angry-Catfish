angryCatfishApp.controller('addBikeController', function ($http, $scope, $timeout, $interval, BikeService, ReservationService) {
  console.log('loaded Add Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

//RESET BUTTON FOR ADD BIKE FORM
  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.addBike = null;
  }
  $scope.reset();

  _this.addBike = function(bike){
    console.log(bike);
    bikeService.addBike(bike).then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log(_this.bikeList);
    });
  };

});
