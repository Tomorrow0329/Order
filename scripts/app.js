/**
 * Created by 111 on 16/3/30.
 */
var app = angular.module('app',['ngRoute']);
app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/menu', {
      templateUrl: 'views/menu.html',
      controller: 'MenuController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .otherwise({
      redirectTo: '/menu'
    });
  /*$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });*/
}]);

