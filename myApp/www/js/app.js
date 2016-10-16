/**
 *  Notes from Cy:
 *  
 *  creating a module:
 *      angular.module('my_module', []).etc...
 *      doing this twice for the same module will overwrite the first one
 *  retrieving a module:
 *      angular.module('my_module')
 *      my_module.service('mySerivce', ...)
 *      my_module.directive('myDirective', ...)
 */

/**
 * Grading App Main Module
 */
angular.module('GradingApp', ['ionic', 'GradingApp.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar)
              StatusBar.styleDefault();
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

/*
  .state('app.search', { url: '/search', views: {
      'menuContent': { templateUrl: 'templates/search.html' } } })
  .state('app.homepage', { url: '/homepage',
      views: { 'menuContent': { templateUrl: 'templates/homepage.html' } } })
*/
    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
    .state('app.homepage', {
        url: '/homepage',
        views: {
            'menuContent': {
                templateUrl: 'templates/homepage.html',
                controller: 'HomePageCtrl'
            }
        }
    })
    .state('app.course', {
        url: '/homepage/:courseId',
        views: {
            'menuContent': {
                templateUrl: 'templates/course.html',
                controller: 'CourseCtrl'
            }
        }
    })
    .state('app.page9', {
        url: '/page9',
        views: {
            'menuContent': {
                templateUrl: 'templates/page9.html'
            }
        }
    }) ;
    $urlRouterProvider.otherwise('/app/homepage');
});
