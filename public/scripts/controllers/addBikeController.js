angryCatfishApp.controller('addBikeController', function ($http, $scope, $timeout, $interval, $uibModalStack, Upload, BikeService, ReservationService) {
  console.log('loaded Add Bike Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  // _this.bikePricing = false;

  console.log(_this.bikePricing);
  $scope.file='';
  $scope.uploads=[];
  $scope.comment='';


  //loads any already uploaded images


//loads images already uploaded
   function getImages() {
       $http.get('/uploads')
           .then(function(response) {
               $scope.uploads = response.data;
               console.log('GET /uploads ', response.data);
           });
   }

   //file uploading functions
   $scope.deletePic = function(id) {
     $http.delete('/uploads/' + id).then(function(){
       getImages();
     });
   };

   $scope.submitPic = function() {

       if ($scope.addBikeForm.file.$valid && $scope.file) {
           $scope.upload($scope.file);
           console.log('file', $scope.file);
       }

   };



   $scope.upload = function(file) {

       Upload.upload({
           url: '/uploads',
           data: {
               file: file,
               //can add more variables to data to store in DB
               'comment': $scope.comment
               //'var2': $scope.var2
           }
       }).then(function(resp) {
           console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
           $scope.file='';
           $scope.comment='';
           getImages();
          //  _this.newBike.imageUrls.push(resp.data)
       }, function(resp) {
           console.log('Error status: ' + resp.status);
       }, function(evt) {
           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

       });
   };


//RESET BUTTON FOR ADD BIKE FORM
  _this.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $http.delete('uploads').then(function(){
      getImages();
    });
    _this.newBike = {};
    _this.newBike.manufacURL = 'http://'
    _this.newBike.imageUrls = [];
    _this.newBike.bulletPoints = [];
    _this.newBike.searchTags = [];
    _this.needImage = false;
  }
  _this.reset();

//SUBMIT BUTTON FOR ADD BIKE FORM
  _this.addBike = function(valid){
    if($scope.uploads.length > 0){
    if(valid){
      _this.newBike.bikePricing = [];
      if(_this.bikePricing){
        _this.newBike.bikePricing.push(_this.oneDayPrice);
        _this.newBike.bikePricing.push(_this.twoDayPrice);
        _this.newBike.bikePricing.push(_this.fiveDayPrice);
      }else{
        _this.newBike.bikePricing.push(75);
        _this.newBike.bikePricing.push(65);
        _this.newBike.bikePricing.push(55);
      }
      _this.newBike.searchTags.push(_this.newBike.bikeCategory);
      _this.newBike.searchTags.push(_this.newBike.bikeMake);
      _this.newBike.searchTags.push(_this.newBike.bikeModel);
      _this.newBike.searchTags.push(_this.newBike.bikeSize);
      _this.newBike.searchTags.push(_this.newBike.bikeFrame);
      _this.newBike.searchTags.push(_this.newBike.bikeWheelSize);
      $scope.uploads.forEach(function(img){
        _this.newBike.imageUrls.push(img.file.location)
      });
      $http.delete('uploads');
      _this.newBike.bulletPoints.forEach(function(bullet){
        _this.newBike.searchTags.push(bullet);
      });
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
    }else{
      console.log("Not Valid");
    }
} else{
  console.log("You need at least one picture");
  console.log(_this.needImage);
  _this.needImage = true;

}
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

_this.closeModal = function(){
  $uibModalStack.dismissAll();
}

});
