// angryCatfishApp.controller('AuthController', function (AuthFactory) {
//   var _this = this;
//   var authFactory = AuthFactory;
//   _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
//
// });

// search filter for angular ui bike search
angryCatfishApp.filter('propsFilter', function() {
  console.log("propsFilter hit!")
  return function(items, props) {
    var out = [];
    console.log("i's:", items);
    if (angular.isArray(items)) {
      var keys = Object.keys(props);
      console.log("p's:", props);
      items.forEach(function(item) {
        var itemMatches = false;
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }
        if (itemMatches) {
          // console.log("Item:", item)
          out.push(item);
        }
      });
    } else {
      out = items; // Let the output be the input untouched

    }
    return out;
  };
});// end of propsFilter

// filter to remove duplicate items on ng repeat
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


angryCatfishApp.controller('AuthController', function (AuthFactory, $http, $scope, $timeout, $interval, BikeService, ReservationService, $uibModal, $log, $document) {
  console.log('loaded Auth Controller');

  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load

  var bikeService = BikeService;
  var reservationService = ReservationService;


  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
    });
  };
  _this.getBikes();

  _this.getReservations = function(){
    reservationService.getReservations().then(function(resList){
      _this.resList = resList.data;
      console.log("reservation list", _this.resList);
      _this.checkDates();
    });
  };
  _this.getReservations();

  _this.sweetAlert = function (){
    swal("Hi", "SweetAlert", "success")
  };

  // Instantiate the modal window
  var modalPopup = function (Id) {
    return $scope.modalInstance = $uibModal.open({
      templateUrl: '../../public/views/templates/bikeDetails.html',
      controller: 'bikeController as bike',
      resolve: {
        editId: function() {
          console.log("Modal Bike Id",Id);
          return Id;
        }
      }
    });
  };

  var modalEditPopup = function (Id) {
    return $scope.modalInstance = $uibModal.open({
      templateUrl: '../../public/views/templates/bikeEditDetails.html',
      controller: 'bikeEditController as bikeEdit',
      resolve: {
        editId: function() {
          console.log("Modal EditBike Id",Id);
          return Id;
        }
      }
    });
  };

  // Modal window popup trigger
  $scope.openModalPopup = function (Id) {
    modalPopup(Id).result
    .then(function (data) {
      $scope.handleSuccess(data);
    })
    .then(null, function (reason) {
      $scope.handleDismiss(reason);
    });
  };

  $scope.openEditModalPopup = function (Id) {
    modalEditPopup(Id).result
    .then(function (data) {
      $scope.handleSuccess(data);
    })
    .then(null, function (reason) {
      $scope.handleDismiss(reason);
    });
  };


  $scope.confirmDelete = function(Id) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this bike!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true
    },
    function(){
      console.log("Deleting",Id);
      bikeService.deleteBike(Id).then(function(bikeList){
        _this.getBikes();
      });
    });
  }
  // $scope.openModalPopup = function(Id) {
  //   var modalInstance = $uibModal.open({
  //     templateUrl:'../../public/views/teamplates/bikeDetails.html',
  //     controller: 'bikeController',
  //     resolve: {
  //       editId: function() {
  //         console.log(Id);
  //         return Id;
  //       }
  //     }
  //   });
  // }

  // Close the modal if Yes button click
  $scope.ok = function () {
    $scope.modalInstance.close('Ok Button Clicked')
  };

  // Dismiss the modal if No button click
  $scope.cancel = function () {
    $scope.modalInstance.dismiss('Cancel Button Clicked')
  };

  // Log Success message
  $scope.handleSuccess = function (data) {
    $log.info('Modal closed: ' + data);
  };

  // Log Dismiss message
  $scope.handleDismiss = function (reason) {
    $log.info('Modal dismissed: ' + reason);
  }

  //---------Calendar Stuff---------------
  _this.today = function() {
    console.log('today')
    _this.dt = {};
  _this.dt.start = new Date();
  _this.dt.end = new Date();

};
_this.today();

// _this.clear = function() {
//   console.log('clear')
//   _this.dt = null;
// };

// _this.submitDates = function(dt) {
//   console.log('Dates:', dt)
//   // check dates
//   _this.clear();
//   // .then(function(response){
//   // }).catch(function(err){
//   //   console.log('error checking dates', err)
//   // });
// };

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

  //Calender Filtering Stuff
  // _this.availability = ["58bf0cff7970320d37d3e2b1"];
  _this.availability = [];

  _this.checkDates = function() {
    _this.availability = [];
    _this.dt.start.setHours(0,0,0,0);
    _this.dt.end.setHours(23,59,59,999);
    _this.filter = {};
    _this.filter.start = _this.dt.start.getTime();
    _this.filter.end = _this.dt.end.getTime();

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
  }







});
