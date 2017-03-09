// angryCatfishApp.controller('AuthController', function (AuthFactory) {
//   var _this = this;
//   var authFactory = AuthFactory;
//   _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
//
// });
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
      });
    };
    _this.getReservations();

    _this.sweetAlert = function (){
      // swal("Hi", "SweetAlert", "success")
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

});

// filter to remove duplicate items on ng repeat
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
}); // end of unique filter
