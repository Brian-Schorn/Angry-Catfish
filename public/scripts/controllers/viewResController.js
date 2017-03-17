
angryCatfishApp.controller('viewResController', function (AuthFactory, $http, $scope, $timeout, $interval, BikeService, ReservationService, $uibModal, $log, $document) {
  console.log('loaded View Reservations Controller');

  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load

  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.pageLoad = false;

//Get all Bikes
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      // console.log('bike list', _this.bikeList);
    });
  };
  _this.getBikes();

  //Get all Reservations
  _this.getReservations = function(){
    reservationService.getReservations().then(function(resList){
      _this.resList = resList.data;
      // console.log("reservation list", _this.resList);
      _this.checkDates();
      _this.pageLoad = true;
    });
  };
  _this.getReservations();

  _this.deleteReservation = function(id){
    swal({
      title: "This will remove the reservation",
      text: "You will not be able to recover any reservation information",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, remove it!",
      closeOnConfirm: true
    },
    function(){
      // console.log("Deleting", id);
      $timeout(function(){
        reservationService.deleteReservation(id).then(function(resList){
          _this.getReservations();
          // console.log('Post Delete bike list:', _this.resList);

        });
    });
  });

  }


  //Build Query Dates array
  _this.checkDates = function() {
    // $scope.dt.start.setHours(0,0,0,0);
    // $scope.dt.end.setHours(23,59,59,999);
    _this.start = new Date($scope.dt.start);
    _this.end = new Date($scope.dt.end);
    _this.dates = [];
    _this.start.setHours(0,0,0,0);
    _this.end.setHours(23,59,59,999);
    while (_this.start <= _this.end){
      if(_this.start.getTime() == 1489298400000){
        console.log("DST");
        _this.start.setTime(_this.start.getTime() - 3600000);
      }
      console.log("START DATE",_this.start);
      _this.dates.push(new Date(_this.start).getTime());
      _this.start.setTime(_this.start.getTime() + 86400000);
    }
    console.log("selected dates", _this.dates);
  };

//   //Date Filtering for Reservation Results
//   _this.dateMatch =  function (haystack, arr) {
//     console.log("haystack",haystack);
//     console.log("arr",arr);
//
//     return arr.some(function (v) {
//       console.log(new Date(v).getTime());
//         return haystack.indexOf(new Date(v).getTime()) >= 0;
//     });
// };
  //VIEW MODAL
  $scope.openModalResPopup = function (Id) {
    modalResPopup(Id).result
    .then(function (data) {
      $scope.handleSuccess(data);
    })
    .then(null, function (reason) {
      $scope.handleDismiss(reason);
    });
  };

  var modalResPopup = function (Id) {
    return $scope.modalInstance = $uibModal.open({
      templateUrl: '/public/views/templates/resDetails.html',
      controller: 'resDetailsController as resDetails',
      resolve: {
        editId: function() {
          // console.log("Modal Reservation ID", Id);
          var resInfo = {
            Id: Id,
          }
          return resInfo;
        }
      }
    });
  };

  //EDIT MODAL
  $scope.openEditModalPopup = function (Id) {
    modalEditPopup(Id).result
    .then(function (data) {
      $scope.handleSuccess(data);
    })
    .then(null, function (reason) {
      $scope.handleDismiss(reason);
    });
  };

  var modalEditPopup = function (Id) {
    return $scope.modalInstance = $uibModal.open({
      templateUrl: '/public/views/templates/bikeEditDetails.html',
      controller: 'bikeEditController as bikeEdit',
      resolve: {
        editId: function() {
          // console.log("Modal EditBike Id",Id);
          return Id;
        }
      }
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
      // console.log("Deleting",Id);
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
    // console.log('today')
    $scope.dt = {};
    $scope.dt.start = new Date();
    $scope.dt.end = new Date();

  };
  _this.today();

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    // dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(2017, 1, 1),
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

  //Changes other date if first conflicts
  $scope.$watch('dt.start', function (newValue) {
    // console.log("NewValue", newValue);
    if($scope.dt.end.getTime()<$scope.dt.start.getTime()){
      // console.log('conflict');
      $scope.dt.end = $scope.dt.start;
    }
    if(_this.pageLoad == true){
    _this.checkDates();
  }
  });
  $scope.$watch('dt.end', function (newValue) {
    // console.log("NewValue", newValue);
    if($scope.dt.end.getTime() < $scope.dt.start.getTime()){
      // console.log('conflict');
      $scope.dt.start = $scope.dt.end;
    }
    if(_this.pageLoad == true){
    _this.checkDates();
  }
  });


  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

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

      return '';
    }

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

});

// filter to remove duplicate items on ng repeat
angryCatfishApp.filter('unique', function() {
  // console.log('Unique filter hit');
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
//
// angryCatfishApp.filter('unique', function() {
//   console.log('Unique filter hit');
//   return function(collection, keyname) { // we will return a function which will take in a collection and a keyname
//     var output = [], // we define our output and keys array;
//     keys = [];
//     angular.forEach(collection, function(item) {// this takes in our original collection and an iterator function
//       var key = item[keyname];// we check to see whether our object exists
//       if(keys.indexOf(key) === -1) { // if it's not already part of our keys array
//       keys.push(key); // add it to our keys array
//       output.push(item);// push this item to our final output array
//     }
//   });
//   return output;// return our array which should be devoid of any duplicates
// };
// });  // end of unique filter


angryCatfishApp.filter('dateMatch', function() {


  return function(item, dates) {
      // console.log("DateMatch", item);
      var output = [];
      angular.forEach(item, function (item){
        item.resDate.some(function (v) {
            if(dates.indexOf(new Date(v).getTime()) >= 0){
              output.push(item)
            }
        });
      });
    return output;
  };
});  // end of dateMatch

angryCatfishApp.filter('bikeMatch', function() {

  return function(item, query, bikeList) {
    // console.log("bikeMatch query", query);
    var output = [];
    var selectedBike;
    angular.forEach(item, function(item){
      //Finds matching Bike in bikeList
      bikeList.forEach(function(bike){
        if (bike._id == item.bikeID[0]){
          selectedBike = bike;
          // console.log(selectedBike);
        }
      })// Ends of bikeList.forEach
      if(!query){
        output.push(item);
      } else{
      if((query.bikeCategory == undefined || (query.bikeCategory && selectedBike.bikeCategory == query.bikeCategory)) &&
      (query.bikeMake == undefined || (query.bikeMake && selectedBike.bikeMake == query.bikeMake)) &&
      (query.bikeModel == undefined || (query.bikeModel && selectedBike.bikeModel == query.bikeModel)) &&
      (query.bikeSize == undefined || (query.bikeSize && selectedBike.bikeSize == query.bikeSize))){
        output.push(item);
      }

    }
    })// Ends angular.forEach
    return output;
  };
}); //End of BikeMatch
