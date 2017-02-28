var googleAuthApp = angular.module('theGoogles', ['ngRoute']);

googleAuthApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/calendar', {
      templateUrl: '/public/views/templates/calendar.html',
      controller: 'CalendarController',
      controllerAs: 'calendar',
    })
    .when('/login', {
      templateUrl: '/public/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .otherwise({
      redirectTo: 'login',
    });
},
]);
