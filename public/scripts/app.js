
var angryCatfishApp = angular.module('angryCatfish', ['ngRoute', 'ngAnimate', 'ngSanitize','ui.select', 'ui.bootstrap']);

angryCatfishApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {


  $routeProvider
    .when('/testPage', {
      templateUrl: '/public/views/templates/testPage.html',
      controller: 'testController',
      controllerAs: 'test',
    })
    .when('/login', {
      templateUrl: '/public/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .when('/bikeDetails', {
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
    .otherwise({
      redirectTo: 'login',
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });



},
]);
