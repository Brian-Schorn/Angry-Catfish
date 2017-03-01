angryCatfishApp.service('BikeService', function ($http) {

  // the public API

    this.getBikes = function () {
      $http.get('/bike').then(function(response){
        console.log(response);
      });
  };

});
