angryCatfishApp.controller('addBikeController', function ($http, $scope, $timeout, $interval, $uibModalStack, BikeService, ReservationService) {
  console.log('loaded Add Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;



//RESET BUTTON FOR ADD BIKE FORM
  _this.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    _this.newBike = {};
    _this.newBike.imageUrls = [];
    _this.newBike.bulletPoints = [];
    _this.newBike.searchTags = [];
  }
  _this.reset();

//SUBMIT BUTTON FOR ADD BIKE FORM
  _this.addBike = function(valid){
    if(valid){
      bike = _this.newBike;
      console.log(bike);
      bikeService.addBike(bike).then(function(bikeList){
        _this.bikeList = bikeList.data;
        console.log(_this.bikeList);
        swal({
          title: "Bike Added!",
          text: "Your new rental bike has been added to the database",
          type: "success",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Awesome!",
          closeOnConfirm: true
        },
        function(isConfirm){
          if (isConfirm){
            $uibModalStack.dismissAll();
          }
        });
      });
    };

  };

//ADD IMAGE URL TO ARRAY
  _this.addImage = function(imgURL){
    console.log(imgURL);
    if(imgURL != "" && imgURL != undefined){
    _this.newBike.imageUrls.push(imgURL);
    _this.newImage.newImage = null;
  }
  }

  _this.deleteImage = function(index){
    _this.newBike.imageUrls.splice(index, 1);
  }

//ADD BULLET POINT TO ARRAY
_this.addBullet = function(bullet){
  console.log(bullet);
  if(bullet != "" && bullet != undefined){
  _this.newBike.bulletPoints.push(bullet);
  _this.newBullet= null;
}
}

_this.deleteBullet = function(index){
  _this.newBike.bulletPoints.splice(index, 1);
}

//ADD BULLET POINT TO ARRAY
_this.addTag = function(tag){
  console.log(tag);
  if(tag != "" && tag != undefined){
  _this.newBike.searchTags.push(tag);
  _this.newTag= null;
}
}

_this.deleteTag = function(index){
  _this.newBike.searchTags.splice(index, 1);
}


});
