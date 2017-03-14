angryCatfishApp.service('UserService', function ($http) {

  this.getCurrentUser = function(){
      return $http.get('/users/currentUser').then(function(res){
        return res;
      });
    };
    
});
