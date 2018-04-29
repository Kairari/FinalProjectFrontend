var cApp = angular.module('characterApp', []);
cApp.controller('characterCtrl', function ($scope, $http) {

  $scope.name = localStorage.getItem("name");

  if($scope.name == null) {
    window.location.href = "index.html";
  }

  var id = localStorage.getItem("id");
  var url = "http://localhost:8000/api/character/?format=json&user__id="+id;

  $scope.id = id;

  $http.get(url)
  .then(function(json) {
    $scope.characters = json.data.objects;
    $scope.characterscount = $scope.characters.length;
  })

  $scope.logout = function () {
    localStorage.clear();
    window.location.href = "index.html";
  }

});

var cnApp = angular.module('newcharacterApp', []);
cnApp.controller('newcharacterCtrl', function ($scope, $http) {
  $scope.name = localStorage.getItem("name");

  if($scope.name == null) {
    window.location.href = "index.html";
  }

  var id = localStorage.getItem("id");
  $scope.id = id;
  $scope.user ='/api/user/'+$scope.id+'/'

  $scope.makecharacter = function() {
    var url = "http://localhost:8000/api/character/";;
    $http.post(url,
      {
        name: $scope.charactername,
        max_health: $scope.maxhealth,
        current_health: $scope.maxhealth,
        user: $scope.user,
        character_position: '0'
      }
    )
    .then(function() {
      window.location.href = "characterlist.html";
    });
  }

  $scope.logout = function () {
    localStorage.clear();
    window.location.href = "index.html";
  }

});
