'use strict';

var key = '2776b29967e1bfd49cfc90686cd48b6c';
var lastfm = 'http://ws.audioscrobbler.com/2.0/?api_key=' + key + '&format=json';

angular.module('guityApp')
  .factory('artistSearch', function($resource){
    return $resource(lastfm + '&method=artist.search&artist=:artist', {}, {
      query: {method:'GET', isArray:false}
    });
  })
  .controller('searchCtrl', function ($scope, artistSearch) {
	$scope.$watch('searchField', function (newVal) {
      if (newVal){
        var res = artistSearch.query({artist: newVal}, function () {
          var artists = res.results.artistmatches.artist;
          for (var a in artists) imageTfr(artists[a].image);
          $scope.artists = res.results.artistmatches.artist;
          // if (jQuery.isEmptyObject(artists[a].mbid) === true) {
          //   $scope.artists.splice(1);
          //   console.log('tar bort' + $scope.artists = res.results.artistmatches.artist)
          // }
        });
      } else {
        $scope.artists = [];
      }
    });
  })
  .directive('fadey', function() {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        jQuery(elm)
          .css({ opacity: 0 })
          .animate({ opacity: 1 }, parseInt(attrs.fadey));
      }
    };
  });

function imageTfr(images) {
	for (var i in images){
	  images[images[i]['size']] = images[i]['#text'];
	}
};