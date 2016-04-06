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
