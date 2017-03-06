angryCatfishApp.service('BikeService', function ($http) {


  // the public API

    this.getBike = function () {
      return $http.get('/bike');
  };

    //need function to add bike + date to reservation

  //
  // this.addBike = function (bike) {
  //   $http.post('/bike', bike);
  //   return $http.get('/bike');
  // };
  //
  // this.updateBike = function (id, bike) {
  //   $http.put('/bike/' + id, bike);
  //   return $http.get('/bike');
  // };
  //
  // this.deleteBike = function (id) {
  //   $http.delete('/bike/' + id);
  //   return $http.get('/bike');
  // };

});
