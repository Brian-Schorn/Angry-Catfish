angryCatfishApp.controller('bikeController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, ngCart, BikeService, ReservationService, editId) {
  console.log('loaded Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.bikeInfo = editId;
  console.log("BikeInfo", _this.bikeInfo);
  _this.modalID = _this.bikeInfo.Id;
  _this.start = new Date(Number(_this.bikeInfo.Start));
  _this.end = new Date(Number(_this.bikeInfo.End));





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

//Grabs Reservations for this bike
_this.getReservations = function(){
  reservationService.getReservationsByBikeID(_this.modalID).then(function(resList){
    _this.resList = resList.data;
    console.log("reservation list for this bike ID", _this.resList);
    _this.checkDates();
  });
};
_this.getReservations();

//Checks for Reservation Conflicts
_this.checkDates = function() {
    _this.availability = [];
    // _this.start.setHours(0,0,0,0);
    // _this.end.setHours(23,59,59,999);
    _this.filter = {};
    _this.filter.start = _this.start.getTime();
    _this.filter.end = _this.end.getTime();

    console.log(_this.filter.start);
    console.log(_this.filter.end);
    console.log("Reservation List",_this.resList);
    _this.resList.forEach(function(res){
      _this.filter.resBikeId = res.bikeID[0];
      console.log("BikeId",_this.filter.resBikeId);
      res.resDate.forEach(function(resDate){
        _this.filter.query = new Date(resDate).getTime();
        console.log("resDate",_this.filter.query);
        if((_this.filter.query >= _this.filter.start) && (_this.filter.query < _this.filter.end)){
          console.log("Conflict!", _this.filter.resBikeId);
          _this.availability.push(_this.filter.resBikeId);
        }
      })
    })
    console.log("Availability Conflicts", _this.availability);
    console.log(_this.availability.length);
  };



//Submit Bike Reservation Button
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
      if (_this.availability.length > 0){
        swal("Apologies! This bike is already booked for some or all of the dates selected")
      }else {
    swal({
  title: "Success! Bike Added to Cart",
  text: "Would you like to proceed to Booking or add another Bike?",
  type: "info",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Book Reservation",
  cancelButtonText: "Add Another Bike",
  closeOnConfirm: true,
  closeOnCancel: false
},
function(isConfirm){
  var id = _this.selectedBike._id;
  var name = _this.selectedBike.bikeMake + " " + _this.selectedBike.bikeModel
  var price = 1;
  var quantity = 1;
  var data = {};
  data.pedal = _this.pedalType;
  data.helmet = _this.helmetSize;
  data.start = _this.start.getTime();
  data.end = _this.end.getTime();
  console.log("bike data", id, name, price, quantity, data);
  if (isConfirm) {
    console.log("Confirmed");
      ngCart.addItem(id, name, price, quantity, data);
      // $location.url('/customerDetails/' + _this.selectedBike._id +'/pedalType/' +_this.pedalType+'/helmetSize/' + _this.helmetSize + '/start/' + _this.start.getTime() + '/end/' + _this.end.getTime());
      $location.url('/customerDetails/');
      $uibModalStack.dismissAll();
  } else {
    ngCart.addItem(id, name, price, quantity, data);
    swal("Bike Reservation Added to Cart", "Please select another bike to add to your transaction", "error");
  }
});

}
}
  }

  //Close Modal
  _this.closeModal = function(){
    $uibModalStack.dismissAll();
  }
});
