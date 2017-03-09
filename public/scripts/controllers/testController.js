// // search filter for angular ui bike search
// angryCatfishApp.filter('propsFilter', function() {
//   // console.log("propsFilter hit!")
//   return function(items, props) {
//     var out = [];
//     // console.log("i's:", items);
//     if (angular.isArray(items)) {
//       var keys = Object.keys(props);
//       // console.log("p's:", props);
//       items.forEach(function(item) {
//         var itemMatches = false;
//         for (var i = 0; i < keys.length; i++) {
//           var prop = keys[i];
//           var text = props[prop].toLowerCase();
//           if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
//             itemMatches = true;
//             break;
//           }
//         }
//         if (itemMatches) {
//           // console.log("Item:", item)
//           out.push(item);
//         }
//       });
//     } else {
//       out = items; // Let the output be the input untouched
//
//     }
//     return out;
//   };
// });// end of propsFilter


// filter to remove duplicate properties on ng repeat
angryCatfishApp.filter('unique', function() {
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
}); // end of unique filter


angryCatfishApp.controller('testController', function ($http, $scope, $timeout, $interval, BikeService, ReservationService) {
  console.log('loaded Test Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;
  // var searchService = SearchService;
//

//
// _this.filterBikes = function(categoryFilter){
//   console.log('filter bike hit', categoryFilter)
// };


  //////// angular ui search dropdown features
  _this.disabled = undefined;
  _this.searchEnabled = undefined;

  _this.setInputFocus = function (){
    $scope.$broadcast('UiSelectDemo1');
  };

  _this.enable = function() {
    _this.disabled = false;
  };

  _this.disable = function() {
    _this.disabled = true;
  };

  _this.enableSearch = function() {
    _this.searchEnabled = true;
  };

  _this.disableSearch = function() {
    _this.searchEnabled = false;
  };

  _this.someGroupFn = function (item){

    if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';

    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';

  };

  _this.firstLetterGroupFn = function (item){
      return item.name[0];
  };

  _this.reverseOrderFilterFn = function(groups) {
    return groups.reverse();
  };

  $timeout(function(){
   _this.bikeList
  },3000);

  _this.counter = 0;
  _this.onSelectCallback = function (item, model){
    vm.counter++;
    vm.eventResult = {item: item, model: model};
  };

  _this.removed = function (item, model) {
    vm.lastRemoved = {
        item: item,
        model: model
    };
  };

  _this.tagTransform = function (newTag) {
    var bike = {
        bikeCategory: newTag,
    };
    return item;
  };

  _this.appendToBodyDemo = {
    remainingToggleTime: 0,
    present: true,
    startToggleTimer: function() {
      var scope = _this.appendToBodyDemo;
      var promise = $interval(function() {
        if (scope.remainingTime < 1000) {
          $interval.cancel(promise);
          scope.present = !scope.present;
          scope.remainingTime = 0;
        } else {
          scope.remainingTime -= 1000;
        }
      }, 1000);
      scope.remainingTime = 3000;
    }
  };

  // _this.addBike = function(item, model){
  //   if(item.hasOwnProperty('isTag')) {
  //     delete item.isTag;
  //     _this.bikeList.push(item);
  //   }
  // }
  //////////// end of angular ui search dropdown features

  //Test Bike Data

  _this.testBike = {
    "bikeCategory" : "Fat Bike",
    "bikeMake" : "Surly",
    "bikeModel" : "X5000",
    "bikeSize" : "standard",
    "searchTags" : [
        "Fat",
        "Sexy"
    ],
    "buyPrice" : "8000",
    "rentalPrice" : 75,
    "bulletPoints" : [
        "Super Good",
        "Not Bad"
    ],
    "bikeDesc" : "This is definetly a bike"
}

_this.testBike2 = {
  "bikeCategory" : "Skinny Bike",
  "bikeMake" : "Surly",
  "bikeModel" : "X5000",
  "bikeSize" : "standard",
  "searchTags" : [
      "Fat",
      "Sexy"
  ],
  "buyPrice" : "8000",
  "rentalPrice" : 75,
  "bulletPoints" : [
      "Super Good",
      "Not Bad"
  ],
  "bikeDesc" : "This is definetly a bike"
}

//Bike Buttons linking to BikeService
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
    });
  };

  _this.getBikes();
  console.log(_this.bikeList);

  _this.addBike = function(bike){
    bikeService.addBike(bike).then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log(_this.bikeList);
    });
  };
  _this.updateBike = function(id, bike){
    bikeService.updateBike(id, bike).then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log(_this.bikeList);
    });
  };
  _this.deleteBike = function(id){
    bikeService.deleteBike(id).then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log(_this.bikeList);
    });
  };

//Reservation Buttons linking to resrvationService

  _this.getReservations = function(){
    reservationService.getReservations().then(function(resList){
      _this.resList = resList;
      console.log(_this.resList);
    });
  };

  _this.getReservationsByBikeID = function(bikeID){
    console.log("BikeID", bikeID);
    reservationService.getReservationsByBikeID(bikeID).then(function(resList){
      _this.resList = resList;
      console.log(_this.resList);
    });
  };

  _this.getReservationsByTransactionID = function(transactionID){
    console.log("TransactionID", transactionID);
    reservationService.getReservationsByTransactionID(transactionID).then(function(resList){
      _this.resList = resList;
      console.log(_this.resList);
    });
  };

  _this.getReservationsByEmail = function(email){
    console.log("Email", email);
    reservationService.getReservationsByEmail(email).then(function(resList){
      _this.resList = resList;
      console.log(_this.resList);
    });
  };

  //Calendar Stuff
  _this.today = function() {
    console.log('today')
    _this.dt = {};
  _this.dt.start = new Date();
  _this.dt.end = new Date();

};
_this.today();

_this.clear = function() {
  console.log('clear')
  _this.dt = null;
};

_this.submitDates = function(dt) {
  console.log('Dates:', dt)
  // check dates
  _this.clear();
  // .then(function(response){
  // }).catch(function(err){
  //   console.log('error checking dates', err)
  // });
};

$scope.inlineOptions = {
  customClass: getDayClass,
  minDate: new Date(),
  showWeeks: true
};

$scope.dateOptions = {
  // dateDisabled: disabled,
  formatYear: 'yy',
  maxDate: new Date(2020, 5, 22),
  minDate: new Date(),
  startingDay: 1
};

// Disable weekend selection
// function disabled(data) {
//   var date = data.date,
//     mode = data.mode;
//   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
// }

// $scope.toggleMin = function() {
//   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
//   $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
// };
//
// $scope.toggleMin();

$scope.open1 = function() {
  $scope.popup1.opened = true;
};

$scope.open2 = function() {
  $scope.popup2.opened = true;
};



$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[0];
$scope.altInputFormats = ['M!/d!/yyyy'];

$scope.popup1 = {
  opened: false
};

$scope.popup2 = {
  opened: false
};

// var tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);
// var afterTomorrow = new Date();
// afterTomorrow.setDate(tomorrow.getDate() + 1);
// $scope.events = [
//   {
//     date: tomorrow,
//     status: 'full'
//   },
//   {
//     date: afterTomorrow,
//     status: 'partially'
//   }
// ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }


//Create a Reservation Stuff
_this.printBike = function(bikeID){
  console.log(bikeID);
  _this.dt.start.setHours(0,0,0,0);
  _this.dt.end.setHours(0,0,0,0);
  console.log("Dates:", _this.dt.start, _this.dt.end);
}

_this.addResStatus = false;

_this.addReservation = function(){
  _this.addResStatus = true;
  _this.dates = [];
  _this.dt.start.setHours(0,0,0,0);
  _this.dt.end.setHours(0,0,0,0);
  while (_this.dt.start <= _this.dt.end){
    _this.dates.push(new Date(_this.dt.start));
    _this.dt.start.setTime(_this.dt.start.getTime() + 86400000);
  }

  _this.bikes = [];
  _this.bikes.push(_this.selectedBike);
  _this.reservationObj = {
    "bikeID" : _this.bikes,
    "resDate" : _this.dates,
    "custName" : "Brian Schorn",
    "custEmail" : "relcore@gamerarmy.com",
    "custPhone" : "320-380-1060",
    "custAddress" : "6200 Co Rd 120",
    "pedalType" : "basic",
    "needHelmet" : false,
    "waiverSigned" : true,
    "totalPrice" : 100
  };
  console.log(_this.reservationObj);
  reservationService.addReservation(_this.reservationObj).then(function(){
    console.log("reservation Added");
    _this.addResStatus = false;
  });

};

});
