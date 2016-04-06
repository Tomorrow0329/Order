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
