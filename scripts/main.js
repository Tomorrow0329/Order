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


/**
 * Created by 111 on 16/4/1.
 */
app.factory('MenuService', ['$http', function ($http) {
  var serviceUrl = 'http://localhost:2223';
  return {

    loginSubmit: function (user) {
      return $http({url: serviceUrl + '/loginSubmit', method: 'GET', params: user});
    },

    submitMenu: function (data) {
      return $http({url: serviceUrl + '/submit', method: 'GET', params: {order: data}});
    }
  }
}]);

/**
 * Created by 111 on 16/4/5.
 */
app.controller('LoginController',['$scope', '$location', 'MenuService', function ($scope, $location, MenuService) {
  //$scope.department = '';

  $scope.$watch('department', function (newValue, oldValue) {
    $scope.departmentOptions.forEach(function (department) {
      if (department.value === newValue) {
        $scope.userOptions = department.people;
      }
    });
  });

  $scope.loginSubmit = function (form) {
    $scope.loging = true;
    if (form.$valid) {
      MenuService.loginSubmit({department: $scope.department, user: $scope.user}).success(function(data) {

        var personnel = new Object();
        $scope.departmentOptions.forEach(function (option) {
          if (option.value === data.department) {
            option.people.forEach(function (people) {
              if (people.value === data.user) {
                localStorage.setItem('department', option.label);
                localStorage.setItem('username', people.label);
              }
            });
          }
        });

        $location.path('/menu');

      }).error(function () {});
    }
  };

  var init = function () {
    localStorage.removeItem('department');
    localStorage.removeItem('username');

    $scope.userOptions = [];
    $scope.departmentOptions = [
      {label: '前端组', value: "01", people: [
        {label: "Jolin", value: "011"},
        {label: "Tom", value: "012"},
        {label: "Jack", value: "013"},
        {label: "Henrey", value: "014"}
      ]},
      {label: '移动组', value: "02", people: [
        {label: "Ada", value: "021"},
        {label: "Alice", value: "022"},
        {label: "Elaine", value: "023"},
        {label: "Darcy", value: "024"}
      ]},
      {label: '设计组', value: "03", people: [
        {label: "Frieda", value: "031"},
        {label: "Ariel", value: "032"},
        {label: "Mercedes", value: "033"},
        {label: "Paula", value: "034"}
      ]},
      {label: '行政组', value: "04", people: [
        {label: "Jocelyn", value: "041"},
        {label: "Amy", value: "042"},
        {label: "Charlene", value: "043"},
        {label: "Eve", value: "044"}
      ]}
    ];
  };

  init();
}]);

/**
 * Created by 111 on 16/3/30.
 */
app.controller('RouteDetailCtl',function($scope, $routeParams) {
  $scope.id = $routeParams.id;
});
/**
 * Created by 111 on 16/4/1.
 */
app.controller('MenuController', ['$scope', '$location', 'MenuService', function($scope, $location, MenuService) {

  if (localStorage.getItem('department') && localStorage.getItem('username')) {

    $scope.userStatus = true;

  } else {
    $scope.userStatus = false;
  }
  var userSelect = undefined;

  $scope.menuList = ['番茄牛肉面', '担担面', '炸酱面', '岐山哨子面', '朝鲜冷面'];

  $scope.toLogIn = function () {};

  $scope.setSelect = function (index) {
    userSelect = index + 1;
  };

  $scope.SubmitMenu = function (form) {
    if (form.$valid && userSelect) {
      MenuService.submitMenu(userSelect).success(function (data) {
        var data = data;

        $location.path('/login');

      }).error(function () {});
    }
  };
}]);
