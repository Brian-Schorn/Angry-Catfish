angryCatfishApp.service('ReservationService', function ($http) {

  // the public API

    this.getReservations = function () {
      $http.get('/reservation').then(function(response){
        console.log(response);
      });
  };

});
