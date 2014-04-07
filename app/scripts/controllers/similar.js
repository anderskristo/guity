;(function() {
'use strict';

angular.module('guityApp')
  .controller('similarCtrl', function($scope, $routeParams, $http, getData) {
    $scope.$emit('load');
    getData.async().then(function(d) {
      var images = d.data.artist.image;
      for (var i in images){
        images[images[i]['size']] = images[i]['#text'];
      };
      
      $scope.artist = d.data.artist;
      $scope.similarTo = d.data.artist.name;
      $http.get(lastfm + '&method=artist.getsimilar&artist=' + $scope.similarTo.replace("&", "%26")).success(function(data) {
        $scope.similars = data.similarartists.artist;        
        
        jQuery.each($scope.similars, function(index, sim) {          
          var simImages = sim.image;
          for (var i in simImages) {
            simImages[simImages[i]['size']] = simImages[i]['#text'];
          }
        });
        $scope.$emit('unload');
      });
      
      $scope.limit = 20;

    });
  });

})();
