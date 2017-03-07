angryCatfishApp.controller('custController', function ($http, $scope, $timeout, $interval, $routeParams, BikeService, ReservationService) {
  console.log('loaded Cust Controller');
  var _this = this;

  var bikeService = BikeService;
  var reservationService = ReservationService;

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
    _this.addResStatus = true;
    // _this.dates = [];
    // _this.dt.start.setHours(0,0,0,0);
    // _this.dt.end.setHours(0,0,0,0);
    // while (_this.dt.start <= _this.dt.end){
    //   _this.dates.push(new Date(_this.dt.start));
    //   _this.dt.start.setTime(_this.dt.start.getTime() + 86400000);
    // }
    _this.bikes = [];
    _this.bikes.push(_this.selectedBike._id);
    _this.reservationObj = {
      "bikeID" : _this.bikes,
      // "resDate" : _this.dates,
      "custName" : _this.custName,
      "custEmail" : _this.email,
      "custPhone" : _this.phone,
      "custAddress" : _this.address,
      "pedalType" : _this.pedal,
      "needHelmet" : _this.helmet,
      "waiverSigned" : true,
      "totalPrice" : 75
    };
    console.log(_this.reservationObj);
    reservationService.addReservation(_this.reservationObj).then(function(){
      console.log("reservation Added");
      _this.addResStatus = false;
    });

  };




});
