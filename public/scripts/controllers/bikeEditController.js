angryCatfishApp.controller('bikeEditController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, Upload, BikeService, ReservationService, editId) {
  console.log('loaded Bike Edit Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.modalID = editId;

  _this.oneDayPrice = 75;
  _this.twoDayPrice = 65;
  _this.fiveDayPrice = 55;


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
          console.log("Pricing", _this.selectedBike.bikePricing);
          if(_this.selectedBike.bikePricing[0] == 75 && _this.selectedBike.bikePricing[1] == 65 && _this.selectedBike.bikePricing[2] == 55){
            _this.bikePricing = 'false';
          }else{
            _this.bikePricing = 'true';
            _this.oneDayPrice = _this.selectedBike.bikePricing[0];
            _this.twoDayPrice = _this.selectedBike.bikePricing[1];
            _this.fiveDayPrice = _this.selectedBike.bikePricing[2];

            console.log(_this.oneDayPrice);
          }
          console.log(_this.selectedBike);
        }
      })
    });
  };

  _this.getBikes();



//New Image Upload
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

     if ($scope.editBikeForm.file.$valid && $scope.file) {
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
        //  _this.selectedBike.imageUrls.push(resp.data)
     }, function(resp) {
         console.log('Error status: ' + resp.status);
     }, function(evt) {
         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

     });
 };


  //RESET BUTTON FOR EDIT BIKE FORM
  _this.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $http.delete('uploads').then(function(){
      getImages();
    });
    _this.getBikes();
    _this.newTag = null;
  }
  _this.reset();

  //SUBMIT BUTTON FOR ADD BIKE FORM
  _this.bikeEdit = function(valid){
    if(valid){

      if(_this.selectedBike.imageUrls.length > 0 || $scope.uploads.length > 0){
      $scope.uploads.forEach(function(img){
        _this.selectedBike.imageUrls.push(img.file.location)
      });
      $http.delete('uploads').then(function(){
        getImages();
      });
      _this.selectedBike.bikePricing = [];
      if(_this.bikePricing == 'true'){
        console.log("Custom Pricing", _this.bikePricing);
        _this.selectedBike.bikePricing.push(_this.oneDayPrice);
        _this.selectedBike.bikePricing.push(_this.twoDayPrice);
        _this.selectedBike.bikePricing.push(_this.fiveDayPrice);
      }else{
        console.log("Default Pricing");
        _this.selectedBike.bikePricing.push(75);
        _this.selectedBike.bikePricing.push(65);
        _this.selectedBike.bikePricing.push(55);
      }
      bike = _this.selectedBike;
      console.log(bike);
      bikeService.updateBike(_this.bikeID, bike).then(function(bikeList){
        _this.getBikes();
      });
      swal({
        title: "Bike Updated!",
        text: "Your rental bike has been updated in the database",
        type: "success",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Awesome!",
        closeOnConfirm: true
      },
      function(isConfirm){
        if (isConfirm){
          // $uibModalStack.dismissAll();
        }
      });
    };
  }else{
  console.log("Not Valid");}
  };

  //ADD IMAGE URL TO ARRAY
    _this.addImage = function(imgURL){
      console.log(imgURL);
      _this.selectedBike.imageUrls.push(imgURL);
      _this.newImage.newImage = null;
    }

    _this.deleteImage = function(index){
      _this.selectedBike.imageUrls.splice(index, 1);
    }

  //ADD BULLET POINT TO ARRAY
  _this.addBullet = function(bullet){
    console.log(bullet);
    if(bullet != "" && bullet != undefined){
    _this.selectedBike.bulletPoints.push(bullet);
  }
    _this.newBullet= null;
  }

  _this.deleteBullet = function(index){
    _this.selectedBike.bulletPoints.splice(index, 1);
  }

  //ADD BULLET POINT TO ARRAY
  _this.addTag = function(tag){
    console.log(tag);
    if(tag != "" && tag != undefined){
    _this.selectedBike.searchTags.push(tag);
  }
    _this.newTag= null;
  }

  _this.deleteTag = function(index){
    _this.selectedBike.searchTags.splice(index, 1);
  }

  //Close Modal
  _this.closeModal = function(){
    $uibModalStack.dismissAll();
  }

});
