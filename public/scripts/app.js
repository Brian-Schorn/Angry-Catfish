
var angryCatfishApp = angular.module('angryCatfish', ['ngRoute', 'ngAnimate', 'ngSanitize','ui.select', 'ui.bootstrap', 'ngCart', 'ngFileUpload']);

angryCatfishApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
    .when('/testPage', {
      templateUrl: '/public/views/templates/testPage.html',
      controller: 'testController',
      controllerAs: 'test',
    })
    .when('/searchForm', {
      templateUrl: '/public/views/templates/searchForm.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .when('/bikeDetails/:bikeID', {
      templateUrl: '/public/views/templates/bikeDetails.html',
      controller: 'bikeController',
      controllerAs: 'bike',
    })
    .when('/customerDetails', {
      templateUrl: '/public/views/templates/customerDetails.html',
      controller: 'custController',
      controllerAs: 'cust',
    })
    .when('/addBike', {
      templateUrl: '/public/views/templates/addBike.html',
      controller: 'addBikeController',
      controllerAs: 'addBike',
    })
    .when('/viewRes', {
      templateUrl: '/public/views/templates/viewRes.html',
      controller: 'viewResController',
      controllerAs: 'viewRes',
      authRequired: true
    })
    .when('/admin', {
      templateUrl: '/public/views/templates/admin.html',
      controller: 'adminController',
      controllerAs: 'admin',
    })
    .otherwise({
      redirectTo: 'searchForm',
    });
  }])
    .run(function($rootScope, $location, $route, UserService){
      $rootScope.$on("$routeChangeStart", function(event, next, current){
        UserService.getCurrentUser().then(function(res) {
         user=res.data.user;
         if(next.authRequired && user.admin != true){
           console.log("ROUTE ERROR");
           $location.path("/searchForm");
           $route.reload();
         }
        });
      });
    });
