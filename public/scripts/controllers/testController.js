angryCatfishApp.controller('testController', function ($http, BikeService, ReservationService) {
  console.log('loaded Test Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

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
      _this.bikeList = bikeList;
      console.log(_this.bikeList);
    });
  };
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

});
