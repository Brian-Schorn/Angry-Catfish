//// filter for search box
angryCatfishApp.filter('propsFilter', function() {
  console.log("propsFilter hit!")
  return function(items, props) {
    var out = [];
    console.log("i's:", items);
    if (angular.isArray(items)) {
      // console.log("items conditional hit, items:", items)
      var keys = Object.keys(props);
    console.log("p's:", props);
      items.forEach(function(item) {
        var itemMatches = false;
        // console.log("Filter!!!")
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }
        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
}); // end of app.filter

// filter to remove duplicate items on ng repeat
// here we define our unique filter
angryCatfishApp.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [];

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key);
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});

angryCatfishApp.controller('testController', function ($http, $scope, $timeout, $interval, BikeService, ReservationService) {
  console.log('loaded Test Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;
  // var searchService = SearchService;

  _this.clearSearch = function() {
    console.log('Clear Search', _this.search)
    _this.search = null;
    // _this.getBikes()
  };

_this.filterBikes = function(categoryFilter){
  console.log('filter bike hit', categoryFilter)
};




/// start of search box

// _this.disabled = undefined;
// _this.searchEnabled = undefined;
//
// _this.setInputFocus = function (){
//   $scope.$broadcast('UiSelectDemo1');
// };
//
// _this.enable = function() {
//   _this.disabled = false;
// };
//
// _this.disable = function() {
//   _this.disabled = true;
// };
//
// _this.enableSearch = function() {
//   _this.searchEnabled = true;
// };
//
// _this.disableSearch = function() {
//   _this.searchEnabled = false;
// };
//
// _this.clear = function() {
//   _this.bike.selected = undefined;
//   _this.address.selected = undefined;
//   _this.country.selected = undefined;
// };
//
// _this.firstLetterGroupFn = function (item){
//     return item.name[0];
// };
//
// _this.reverseOrderFilterFn = function(groups) {
//   return groups.reverse();
// };
//
// _this.peopleAsync = [];
//
// $timeout(function(){
//  _this.bikeList1
// },3000);
//
// _this.counter = 0;
// _this.onSelectCallback = function (item, model){
//   _this.counter++;
//   _this.eventResult = {item: item, model: model};
// };
//
// _this.removed = function (item, model) {
//   _this.lastRemoved = {
//       item: item,
//       model: model
//   };
// };
//
// // _this.person.selectedValue = _this.peopleObj[3];
// // _this.person.selectedSingle = 'Samantha';
// // _this.person.selectedSingleKey = '5';
// // _this.person.selected = _this.person.selectedValue;
//
//
// _this.multipleDemo = {};
// // _this.multipleDemo.selectedPeople = [_this.people[1], _this.people[0]];
// _this.multipleDemo.selectedPeople2 = _this.multipleDemo.selectedPeople;
// _this.multipleDemo.selectedPeopleSimple = [];
// _this.multipleDemo.removeSelectIsFalse = [];
// //
// _this.appendToBodyDemo = {
//   remainingToggleTime: 0,
//   present: true,
//   startToggleTimer: function() {
//     var scope = _this.appendToBodyDemo;
//     var promise = $interval(function() {
//       if (scope.remainingTime < 1000) {
//         $interval.cancel(promise);
//         scope.present = !scope.present;
//         scope.remainingTime = 0;
//       } else {
//         scope.remainingTime -= 1000;
//       }
//     }, 1000);
//     scope.remainingTime = 3000;
//   }
// };
// //
// _this.addPerson = function(item, model){
//   if(item.hasOwnProperty('isTag')) {
//     delete item.isTag;
//     _this.people.push(item);
//   }
// }

///// end of search box

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
      _this.bikeList = bikeList;
      console.log(_this.bikeList);
    });
  };
  _this.updateBike = function(id, bike){
    bikeService.updateBike(id, bike).then(function(bikeList){
      _this.bikeList = bikeList;
      console.log(_this.bikeList);
    });
  };
  _this.deleteBike = function(id){
    bikeService.deleteBike(id).then(function(bikeList){
      _this.bikeList = bikeList;
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

  //
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

$scope.submitDates = function(dt) {
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

$scope.setDate = function(year, month, day) {
  $scope.dt = new Date(year, month, day);
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

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var afterTomorrow = new Date();
afterTomorrow.setDate(tomorrow.getDate() + 1);
$scope.events = [
  {
    date: tomorrow,
    status: 'full'
  },
  {
    date: afterTomorrow,
    status: 'partially'
  }
];

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

});
