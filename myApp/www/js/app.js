/**  Grading App Main Module
 */
angular.module('GradingApp', ['ionic', 'GradingApp.controllers', 'ngCordova', 'backand'])

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

.config(function($stateProvider, $urlRouterProvider, BackandProvider) {
    //$stateProvider

    BackandProvider.setAppName('pocketta');
    BackandProvider.setSignUpToken('f1ef0117-99c6-45e8-b2c8-c1a1daa0b726');
    BackandProvider.setAnonymousToken('a2990cc8-140c-4131-82a0-b7bafa5edce6');

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

    .state('app.homepage', {
        url: '/homepage',
        views: {
            'menuContent': {
                templateUrl: 'templates/homepage.html',
                controller: 'HomePageCtrl',
		service: 'classService'
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
                templateUrl: 'templates/page9.html',
                controller: 'AssignmentsCtrl',
		service: 'assignmentsService'
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

    .state('app.page6', {
        url: '/page6',
        views: {
            'menuContent': {
                templateUrl: 'templates/page6.html'
            }
        }
    })

//// templates/page1.html doesn't exist

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

////
//  .state('app.page3', {
//      url: '/page3',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page3.html'
//        }
//      }
//  })

//// templates/page4.html doesn't exist
//
//  .state('app.page4', {
//      url: '/page4',
//      views: {
//      'menuContent': {
//        templateUrl: 'templates/page4.html'
//      }
//    }
// })

//// templates/page5.html doesn't exist

  .state('app.page5', {
      url: '/page5',
      views: {
        'menuContent': {
          templateUrl: 'templates/page5.html',
	  controller: 'studentsCtrl'
        }
      }
  })

//// app.page6 defined twice
//
//  .state('app.page6', {
//      url: '/page6',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page6.html'
//        }
//      }
//  })

//// templates/page7.html doesn't exist
//
//  .state('app.page7', {
//      url: '/page7',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page7.html'
//        }
//      }
//  })

//// app.page8 defined twice
//
// .state('app.page8', {
//      url: '/page8',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page8.html'
//        }
//      }
//  })

//// app.page9 defined twice
//
//  .state('app.page9', {
//      url: '/page9',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page9.html',
//          controller: 'AssignmentsCtrl'
//        }
//      }
//  })

//// templates/page10.html doesn't exist

  .state('app.page10', {
      url: '/page10',
      views: {
        'menuContent': {
          templateUrl: 'templates/page10.html'
        }
      }
  })

//// templates/page11.html doesn't exist
//
//  .state('app.page11', {
//      url: '/page11',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page11.html'
//        }
//      }
//  })

  .state('app.page12', {
      url: '/page12',
      views: {
        'menuContent': {
          templateUrl: 'templates/page12.html',
          controller: 'HomeController'
        }
      }
  })

//// templates/page13.html doesn't exist
//
//  .state('app.page13', {
//      url: '/page13',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/page13.html'
//        }
//      }
//  })

 //templates/page14.html doesn't exist

  .state('app.page14', {
      url: '/page14',
      views: {
        'menuContent': {
            templateUrl: 'templates/page14.html'
        }
      }
  })

    .state('app.page16', {
        url: '/page16',
        views: {
            'menuContent': {
                templateUrl: 'templates/page16.html'
            }
        }
    })

    .state('app.page17', {
        url: '/page17',
        views: {
            'menuContent': {
                templateUrl: 'templates/page17.html',
                controller: 'studentsCtrl',
		service: 'studentsService'
            }
        }
    }) ;

 /******* end of stuff from pull */

  $urlRouterProvider.otherwise('/app/homepage');
});
