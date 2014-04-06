'use strict';

angular.module('guityApp')
  .controller('albumsCtrl', function($scope, $routeParams, $http, getData) {
    $scope.$emit('load');
    getData.async().then(function(d) {
      $scope.artist = d.data.artist;
      $scope.name = d.data.artist.name;

      $http.get(lastfm + '&method=artist.gettopalbums&artist=' + $scope.name.replace("&", "%26")).success(function(data) {
        $scope.albums = data.topalbums.album;
        console.log($scope.albums);

        jQuery.each($scope.albums, function(index, alb) {
          console.log(alb)
          var albImages = alb.image;
            for (var i in albImages){
              albImages[albImages[i]['size']] = albImages[i]['#text'];
          }
        });

      });

      $scope.$emit('unload');
    });
  })
