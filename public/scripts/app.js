var angryCatfishApp = angular.module('angryCatfish', ['ngRoute', 'ngAnimate']);

angryCatfishApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

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
    .otherwise({
      redirectTo: 'login',
    });
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
});
    // $locationProvider.html5Mode(true);

},
]);
