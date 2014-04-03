;(function() {
  'use strict';

angular.module('guityApp')
  .service('getData', function($http, $routeParams) {
    return {
      async: function() {
        return $http.get(lastfm + '&method=artist.getInfo&mbid=' + $routeParams.mbid);
      }
    };
  })
  .controller('artistCtrl', function ($scope, $routeParams, $http, getData) {
    getData.async().then(function(d) {
    
      var images = d.data.artist.image;
      for (var i in images){
        images[images[i]['size']] = images[i]['#text'];
      };

      $scope.artist = d.data.artist;      
      var options = {
        useEasing   : true,
        useGrouping : true,
        seperator   : ',',
        decimal     : '.',
        duration    : '1'
      };
      var listeners = new countUp('listeners', 0, d.data.artist.stats.listeners);
      listeners.start();

      var scrobblers = new countUp('scrobblers', 0, d.data.artist.stats.playcount);
      scrobblers.start();
    });

  });

})();
