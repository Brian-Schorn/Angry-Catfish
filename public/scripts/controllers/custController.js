angryCatfishApp.controller('custController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, ngCart, BikeService, ReservationService) {
  console.log('loaded Cust Controller');
  var _this = this;

  var bikeService = BikeService;
  var reservationService = ReservationService;

  console.log("cart:",ngCart.getTotalItems());
  _this.cart = ngCart.getItems();
  console.log("cart items:", _this.cart);

  _this.start = new Date(Number(_this.cart[0]._data.start));
  _this.end = new Date(Number(_this.cart[0]._data.end));
  _this.dates = [];
  _this.start.setHours(0,0,0,0);
  _this.end.setHours(0,0,0,0);
  _this.startDisplay = _this.start.toDateString();
  _this.endDisplay = _this.end.toDateString();

  while (_this.start <= _this.end){
    _this.dates.push(new Date(_this.start));
    _this.start.setTime(_this.start.getTime() + 86400000);
  }
  console.log("dates",_this.dates.length)
  console.log(_this.dates);
  _this.numberofDays = _this.dates.length;
  _this.calcPrice = function(){
  if(_this.dates.length == 1){
    _this.priceRate = 0;
    _this.cart.forEach(function(item){
      _this.priceRate += item._data.pricing[0]
    });
  }
  if(_this.dates.length > 1 && _this.dates.length < 5){
    _this.priceRate = 0;
    _this.cart.forEach(function(item){
      _this.priceRate += item._data.pricing[1]
    });
  }
  if(_this.dates.length > 4){
    _this.priceRate = 0;
    _this.cart.forEach(function(item){
      _this.priceRate += item._data.pricing[2]
    });
  }
  _this.totalPrice = _this.priceRate * _this.dates.length;
  console.log("totalPrice", _this.totalPrice);
}
_this.calcPrice();

  //Grabs all the bikes from the DB
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
      //Pulls bike ID from params
      _this.bikeID = [];
      _this.cart.forEach(function(bike){
        _this.bikeID.push(bike._id)
      });
      console.log("Bikes IDs in Cart",_this.bikeID);

      //Finds matching Bike in bikeList
      _this.selectedBike = [];
      _this.bikeID.forEach(function(test){
        _this.bikeList.forEach(function(bike){
          if (test == bike._id){
            _this.selectedBike.push(bike);
          }
        })
      })
    });
  };

  _this.getBikes();

  //Pull the Pedal and Helmet info from Cart
  _this.pedal = [];
  _this.helmet = [];
  _this.cart.forEach(function(item){
    _this.pedal.push(item._data.pedal);
    _this.helmet.push(item._data.helmet);
  })
  console.log("Pedal Type:",_this.pedal);
  console.log("Helmet Size:",_this.helmet);

  _this.addResStatus = false;

  _this.addRes = function(valid){
    if(valid){
    _this.addResStatus = true;
    console.log("Dates",_this.dates);
    console.log("Total Price", _this.totalPrice);
    _this.bikes = _this.selectedBike;
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
    }).then(function(){
      ngCart.empty();
      swal({
        title: "Reservation Added!",
        text: "Your reservation was succesful, you will recieve an email with further details",
        type: "success",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Awesome!",
        closeOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm){

          $uibModalStack.dismissAll();
          $timeout(function(){
            console.log("Booking Successful");
            $location.url('/searchForm/')
          });
        }
      });
    });
  };
};
  _this.cancelRes = function(){
    _this.addResStatus = true;

    swal({
    title: "Are You Sure?",
    text: "You will lose all customer information entered",
    type: "info",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Return to Browsing",
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

  _this.deleteItem = function(index){
    console.log("Removing", index);
    swal({
      title: "This will remove the bike from your cart",
      text: "If you have no bikes left in your cart you will be returned to the home page",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, remove it!",
      closeOnConfirm: true
    },
    function(){
      console.log("Deleting", index);
      $timeout(function(){
        ngCart.removeItem(index);
        _this.getBikes();
        _this.calcPrice();
        if(_this.cart.length == 0){
          $location.url('/searchForm/')

        }

    });
  });


  }



});

angryCatfishApp.filter('unique', function() {
  console.log('Unique filter hit');
  return function(collection, keyname) { // we will return a function which will take in a collection and a keyname
    var output = [], // we define our output and keys array;
    keys = [];
    angular.forEach(collection, function(item) {// this takes in our original collection and an iterator function
      var key = item[keyname];// we check to see whether our object exists
      if(keys.indexOf(key) === -1) { // if it's not already part of our keys array
      keys.push(key); // add it to our keys array
      output.push(item);// push this item to our final output array
    }
  });
  return output;// return our array which should be devoid of any duplicates
};
});
