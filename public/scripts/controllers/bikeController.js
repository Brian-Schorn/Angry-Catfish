angryCatfishApp.controller('bikeController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, BikeService, ReservationService, editId) {
  console.log('loaded Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.modalID = editId;



  //Grabs all the bikes from the DB
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
        //Pulls bike ID from params
        _this.bikeID = _this.modalID;
        console.log(_this.bikeID);

        //Finds matching Bike in bikeList
        _this.bikeList.forEach(function(bike){
          if (bike._id == _this.bikeID){
            _this.selectedBike = bike;
            console.log(_this.selectedBike);
          }
        })
      });
    };

    _this.getBikes();

  _this.submitBike = function() {
    _this.helmetNeeded = false;
    _this.pedalNeeded = false;
    if (!_this.helmetSize){
      _this.helmetNeeded = true;
    }
    if (!_this.pedalType){
      _this.pedalNeeded = true;
    }
    if(_this.helmetSize && _this.pedalType){
    swal({
  title: "Success! Bike Added to Cart",
  text: "Would you like to proceed to Checkout or add another Bike?",
  type: "info",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Checkout",
  cancelButtonText: "Add Another Bike",
  closeOnConfirm: true,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
    console.log("Confirmed");
      $location.url('/customerDetails/' + _this.selectedBike._id +'/pedalType/' +_this.pedalType+'/helmetSize/' + _this.helmetSize);
      $uibModalStack.dismissAll();
  } else {
    swal("Cancelled", "Your imaginary file is safe :)", "error");
  }
});

}
  }
});
