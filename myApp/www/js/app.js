// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.page1', {
      url: '/page1',
      views: {
        'menuContent': {
          templateUrl: 'templates/page1.html'
        }
      }
  })

  .state('app.page2', {
      url: '/page2',
      views: {
        'menuContent': {
          templateUrl: 'templates/page2.html'
        }
      }
  }) 

  .state('app.page3', {
      url: '/page3',
      views: {
        'menuContent': {
          templateUrl: 'templates/page3.html'
        }
      }
  }) 

  .state('app.page4', {
      url: '/page4',
      views: {
        'menuContent': {
          templateUrl: 'templates/page4.html'
        }
      }
  }) 

  .state('app.page5', {
      url: '/page5',
      views: {
        'menuContent': {
          templateUrl: 'templates/page5.html'
        }
      }
  }) 
  .state('app.page6', {
      url: '/page6',
      views: {
        'menuContent': {
          templateUrl: 'templates/page6.html'
        }
      }
  }) 

  .state('app.page7', {
      url: '/page7',
      views: {
        'menuContent': {
          templateUrl: 'templates/page7.html'
        }
      }
  }) 

  .state('app.page8', {
      url: '/page8',
      views: {
        'menuContent': {
          templateUrl: 'templates/page8.html'
        }
      }
  }) 

  .state('app.page9', {
      url: '/page9',
      views: {
        'menuContent': {
          templateUrl: 'templates/page9.html',
          controller: 'AssignmentsCtrl'
        }
      }
  }) 
  .state('app.page10', {
      url: '/page10',
      views: {
        'menuContent': {
          templateUrl: 'templates/page10.html'
        }
      }
  }) 
  .state('app.page11', {
      url: '/page11',
      views: {
        'menuContent': {
          templateUrl: 'templates/page11.html'
        }
      }
  }) 
  .state('app.page12', {
      url: '/page12',
      views: {
        'menuContent': {
          templateUrl: 'templates/page12.html'
        }
      }
  }) 
  .state('app.page13', {
      url: '/page13',
      views: {
        'menuContent': {
          templateUrl: 'templates/page13.html'
        }
      }
  }) 
  .state('app.page14', {
      url: '/page14',
      views: {
        'menuContent': {
          templateUrl: 'templates/page14.html'
        }
      }
  }) ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
