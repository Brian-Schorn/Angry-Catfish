angryCatfishApp.controller('custController', function ($http, $scope, $timeout, $interval, $routeParams, $location, BikeService, ReservationService) {
  console.log('loaded Cust Controller');
  var _this = this;

  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.start = new Date(Number($routeParams.startDate));
  _this.end = new Date(Number($routeParams.endDate));
  _this.dates = [];
  _this.start.setHours(0,0,0,0);
  _this.end.setHours(0,0,0,0);
  while (_this.start <= _this.end){
    _this.dates.push(new Date(_this.start));
    _this.start.setTime(_this.start.getTime() + 86400000);
  }
  console.log("dates",_this.dates.length)
  console.log(_this.dates);
  _this.priceRate = 75;
  _this.numberofDays = _this.dates.length;
  if(_this.dates.length > 2){
    _this.priceRate = 65;
  }
  if(_this.dates.length > 5){
    _this.priceRate = 55;
  }
  _this.totalPrice = _this.priceRate * _this.dates.length;
  console.log("totalPrice", _this.totalPrice);

  //Grabs all the bikes from the DB
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
      //Pulls bike ID from params
      _this.bikeID = $routeParams.bikeID;
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

  //Pull the Pedal and Helmet info from Params
  _this.pedal = $routeParams.pedalType;
  _this.helmet = $routeParams.helmetSize;
  console.log("Pedal Type:",_this.pedal);
  console.log("Helmet Size:",_this.helmet);

  _this.addResStatus = false;

  _this.addRes = function(){
    swal("Great", "A bike is reserved for you. An email confirmation will be sent shortly.", "success")
    _this.addResStatus = true;
    console.log("Dates",_this.dates);
    _this.bikes = [];
    _this.bikes.push(_this.selectedBike._id);
    _this.reservationObj = {
      "bikeID" : _this.bikes,
      "resDate" : _this.dates,
      "custName" : _this.custName,
      "custEmail" : _this.email,
      "custPhone" : _this.phoneNumber,
      "custAddress" : _this.address,
      "pedalType" : _this.pedal,
      "needHelmet" : _this.helmet,
      "waiverSigned" : true,
      "totalPrice" : _this.totalPrice
    };
    console.log(_this.reservationObj);
    reservationService.addReservation(_this.reservationObj).then(function(){
      console.log("reservation Added");
      _this.addResStatus = false;
    });
  };

  _this.cancelRes = function(){
    _this.addResStatus = true;

    swal({
    title: "Are You Sure?",
    text: "You will lose all information entered",
    type: "info",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Cancel",
    cancelButtonText: "Continue Booking",
    closeOnConfirm: true,
    closeOnCancel: true
    },
    function(isConfirm){
    if (isConfirm) {
      $timeout(function(){
        _this.addResStatus = false;
        console.log("Booking Cancelled");
        $location.url('/searchForm/')
      });

  }else{
    console.log("Booking Continued");
    $timeout(function(){_this.addResStatus = false;});
    }
    });
  };





});
