// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'google.places', 'ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('GeoCtrl', GeoCtrl);

function GeoCtrl($scope, $cordovaGeolocation, $compile, NgMap){
  var posOptions = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      //initAutocomplete(position.coords.latitude, position.coords.longitude);
    }, function(err) {
      // error
  });


  $scope.location = null;

  NgMap.getMap().then(function (map) {
    console.log("getMap");
    $scope.map = map;
  });
  
  $scope.$on('g-places-autocomplete:select', function(event, place) {
    console.log('new location: ' + JSON.stringify(place));
    $scope.data = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    $scope.map.setCenter(place.geometry.location);
    console.log($scope.data);
  });


}