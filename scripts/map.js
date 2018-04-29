var mApp = angular.module('mapApp', []);
mApp.controller('mapCtrl', function ($scope, $http) {

  $scope.name = localStorage.getItem("name");

  if($scope.name == null) {
    window.location.href = "index.html";
  }

  var id = localStorage.getItem("id");
  var url = "http://localhost:8000/api/map/?format=json&user__id="+id;

  $http.get(url)
  .then(function(json) {
    $scope.maps = json.data.objects;
    $scope.mapscount = $scope.maps.length;
  })

  $scope.logout = function () {
    localStorage.clear();
    window.location.href = "index.html";
  }

});

var mnApp = angular.module('newmapApp', []);
mnApp.controller('newmapCtrl', function ($scope, $http) {
  $scope.name = localStorage.getItem("name");
  if($scope.name == null) {
    window.location.href = "index.html";
  }

  var id = localStorage.getItem("id");
  $scope.id = id;
  $scope.user =['/api/user/'+$scope.id+'/'];

  $scope.makemap = function() {
    var url = "http://localhost:8000/api/map/";;
    $http.post(url,
      {
        name: $scope.mapname,
        map_columns: $scope.mapcolumns,
        map_rows: $scope.maprows,
        user: $scope.user
      }
    )
    .then(function() {
      window.location.href = "maplist.html";
    });
  }

  $scope.logout = function () {
    localStorage.clear();
    window.location.href = "index.html";
  }

});
