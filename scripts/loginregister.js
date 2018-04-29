var lApp = angular.module('loginApp', []);
lApp.controller('loginCtrl', function ($scope, $http) {

  $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);
        var url = "http://localhost:8000/api/user/?email="+$scope.email;
        $http.get(url)
        .then(function(json) {
          $scope.user = json.data.objects;
        })
        .then(function() {
          if($scope.user.length != 0) {
            $scope.user[0].password
            if($scope.password == $scope.user[0].password) {
              localStorage.setItem('name', $scope.user[0].first_name);
              localStorage.setItem('id', $scope.user[0].id);
              window.location.href = "characterlist.html";
            }
            else {
              $( "#invalid" ).removeClass( "hidden" )
            }
          }
          else {
            $( "#invalid" ).removeClass( "hidden" )
          }

        })
    }

});

var rApp = angular.module('registerApp', []);
rApp.controller('registerCtrl', function ($scope, $http) {
  $scope.register = function() {
    var url = "http://localhost:8000/api/user/";;
    $http.post(url,
      {
        email: $scope.email,
        first_name: $scope.firstname,
        password: $scope.password

      }
    )
    .then(function() {
      window.location.href = "index.html";
    });
  }
});
