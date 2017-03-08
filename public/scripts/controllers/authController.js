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
      });
    };
    _this.getReservations();

    // _this.sweetAlert = function (){
    //   swal("Hi", "SweetAlert", "success")
    // };


    // Instantiate the modal window
var modalPopup = function () {
  return $scope.modalInstance = $uibModal.open({
    templateUrl: '../../public/views/templates/bikeDetails.html',
    scope: $scope
  });
};

      // Modal window popup trigger
      $scope.openModalPopup = function () {
        modalPopup().result
          .then(function (data) {
            $scope.handleSuccess(data);
          })
          .then(null, function (reason) {
            $scope.handleDismiss(reason);
          });
      };

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





});
