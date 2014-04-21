'use strict';

angular.module('guityApp')
  .controller('albumCtrl', function($scope, $routeParams, $http, getData) {
    $scope.$emit('load');
    getData.async().then(function(d) {
      var images = d.data.artist.image;
      for (var i in images){
        images[images[i]['size']] = images[i]['#text'];
      };
      $scope.artist = d.data.artist;
      $scope.name = d.data.artist.name;

      $http.get(lastfm + '&method=album.getinfo&artist=' + $scope.name.replace("&", "%26") + '&album=' + $routeParams.name).success(function(data) {
        $scope.album = data.album;
        $scope.tracks = data.album.tracks.track;

        var albImages = $scope.album.image;
          for (var i in albImages){
            albImages[albImages[i]['size']] = albImages[i]['#text'];
        }
        $scope.$emit('unload');
      });

    });
  })