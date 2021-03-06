// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {


  $ionicPlatform.ready(function() {

    ngFB.init({
      appId: appId.id
    });

    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    cache: false,
    templateUrl: 'templates/fbPost.html',
    controller: 'facebookPostSharingCtrl'
  })

  .state('facebookDirectSharing', {
    url: '/facebookDirectSharing',
    cache: false,
    templateUrl: 'templates/fbPostDirectSharing.html',
    controller: 'facebookDirectSharingCtrl'

  })


  .state('facebookImageSharing', {
    url: '/facebookImageSharing',
    cache: false,
    templateUrl: 'templates/fbPostImageSharing.html',
    controller: 'facebookImageSharingCtrl'
  })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
