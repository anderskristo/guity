;(function() {
'use strict';

// sim = Similar artists

angular.module('guityApp')
  .controller('similarCtrl', function($scope, $routeParams, $http, getData) {
    getData.async().then(function(d) {
      $scope.artist = d.data.artist;
      $scope.similarTo = d.data.artist.name;

      $http.get(lastfm + '&method=artist.getsimilar&artist=' + $scope.similarTo.replace("&", "%26")).success(function(data) {
        // Scope this to the template
        $scope.similars = data.similarartists.artist;

        // Loop every sim and then loopiloop the images-array, hm should i go with jquery for loop?..
        jQuery.each($scope.similars, function(index, sim) {
          var simImages = sim.image;
            for (var i in simImages){
              simImages[simImages[i]['size']] = simImages[i]['#text'];
          }
        })

      });

      // Set the limit for the sims
      $scope.limit = 20;

    });
  });

})();
