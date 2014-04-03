'use strict';

angular.module('guityApp')
  .controller('eventsCtrl', function($scope, $routeParams, $http, getData) {
    getData.async().then(function(d) {
      $scope.artist = d.data.artist;
      $scope.name = d.data.artist.name;

      $http.get(lastfm + '&method=artist.getevents&artist=' + $scope.name).success(function(data) {
        $scope.events = data.events.event;

        // Fetch the next event to the map
        $scope.nextEvent = data.events.event[0];
        console.log($scope.nextEvent);
        $scope.lat = $scope.nextEvent.venue.location['geo:point']['geo:lat'];
        $scope.long = $scope.nextEvent.venue.location['geo:point']['geo:long'];

        $scope.map = {
          center: {
            latitude: $scope.lat,
            longitude: $scope.long
          },
          marker: {
            latitude: $scope.lat,
            longitude: $scope.long
          },          
          zoom: 8
        };
      });

      $scope.limit = 10;

    });
  })
