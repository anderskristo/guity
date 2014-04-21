'use strict';

angular.module('guityApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps',
  'wu.masonry'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
      })
      .when('/artist/:mbid', {
        templateUrl: 'views/artist.html',
        controller: 'artistCtrl'
      })
      .when('/artist/similar/:mbid', {
        templateUrl: 'views/similar.html',
        controller: 'similarCtrl'
      })
      .when('/artist/events/:mbid', {
        templateUrl: 'views/events.html',
        controller: 'eventsCtrl'
      })
      .when('/artist/albums/:mbid', {
        templateUrl: 'views/albums.html',
        controller: 'albumsCtrl'
      })
      .when('/artist/albums/:name/:mbid', {
        templateUrl: 'views/album.html',
        controller: 'albumCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  })
  .controller('appCtrl', function ($scope) {
    $scope.$on('load', function() {
      $scope.loading = true;
    });
    $scope.$on('unload', function() {
      $scope.loading = false;
    });
  });
