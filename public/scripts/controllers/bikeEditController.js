angryCatfishApp.controller('bikeEditController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, BikeService, ReservationService, editId) {
  console.log('loaded Bike Edit Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.modalID = editId;



  //Grabs all the bikes from the DB
  _this.getBikes = function(){
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
      //Pulls bike ID from params
      _this.bikeID = _this.modalID;
      console.log(_this.bikeID);

      //Finds matching Bike in bikeList
      _this.bikeList.forEach(function(bike){
        if (bike._id == _this.bikeID){
          _this.selectedBike = bike;
          console.log(_this.selectedBike);
        }
      })
    });
  };

  _this.getBikes();

  //RESET BUTTON FOR EDIT BIKE FORM
  _this.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    _this.getBikes();
  }
  _this.reset();

  //SUBMIT BUTTON FOR ADD BIKE FORM
  _this.bikeEdit = function(valid){
    if(valid){
      bike = _this.selectedBike;
      console.log(bike);
      bikeService.updateBike(_this.bikeID, bike).then(function(bikeList){
        _this.getBikes();
      });
    };
  };

  //ADD IMAGE URL TO ARRAY
    _this.addImage = function(imgURL){
      console.log(imgURL);
      _this.selectedBike.imageUrls.push(imgURL);
      _this.newImage.newImage = null;
    }

  //ADD BULLET POINT TO ARRAY
  _this.addBullet = function(bullet){
    console.log(bullet);
    _this.selectedBike.bulletPoints.push(bullet);
    _this.newBullet= null;
  }

  //ADD BULLET POINT TO ARRAY
  _this.addTag = function(tag){
    console.log(tag);
    _this.selectedBike.searchTags.push(tag);
    _this.newTag= null;
  }

  //Close Modal
  _this.closeModal = function(){
    $uibModalStack.dismissAll();
  }

});
