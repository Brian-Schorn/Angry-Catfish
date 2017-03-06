angryCatfishApp.controller('addBikeController', function ($http, $scope, $timeout, $interval, BikeService, ReservationService) {
  console.log('loaded Add Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;
  _this.newBike = {};
  _this.newBike.imageUrls = [];
  _this.newBike.bulletPoints = [];
  _this.newBike.searchTags = [];



//RESET BUTTON FOR ADD BIKE FORM
  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.addBike = null;
  }
  $scope.reset();

//SUBMIT BUTTON FOR ADD BIKE FORM
  _this.addBike = function(bike){
    console.log(bike);
    bikeService.addBike(bike).then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log(_this.bikeList);
    });
  };

//ADD IMAGE URL TO ARRAY
  _this.addImage = function(imgURL){
    console.log(imgURL);
    _this.newBike.imageUrls.push(imgURL);
    _this.newImage.newImage = null;

  }

//ADD BULLET POINT TO ARRAY
_this.addBullet = function(bullet){
  console.log(bullet);
  _this.newBike.bulletPoints.push(bullet);
  _this.newBullet= null;

}

//ADD BULLET POINT TO ARRAY
_this.addTag = function(tag){
  console.log(tag);
  _this.newBike.searchTags.push(tag);
  _this.newTag= null;

}


});
