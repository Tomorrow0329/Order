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
