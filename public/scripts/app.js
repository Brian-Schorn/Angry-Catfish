
var angryCatfishApp = angular.module('angryCatfish', ['ngRoute', 'ngAnimate', 'ngSanitize','ui.select', 'ui.bootstrap']);

angryCatfishApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

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
    .when('/customerDetails/:bikeID/pedalType/:pedalType/helmetSize/:helmetSize', {
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
      redirectTo: 'searchForm',
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });



},
]);
