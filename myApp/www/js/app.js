/**
 * Cy's current picture of what the direcotry looks like
 * .
 * ├── css
 * │   └── style.css    <------ added a rule in here, but doesn't seem to affect
 * ├── img                      anything
 * │   ├── epichighered.png <------------------------ for page2(homepage)'s link
 * │   └── ionic.png
 * ├── index.html           <------ body tag points to GradingApp, defined below
 * ├── js
 * │   ├── app.js           <-------------------------------------- you are here
 * │   ├── controllers.js
 * │   └── original_starterapp_files   <--- contains the original files. I don't
 * │       ├── app.js                       need it anymore if you guys want to
 * │       └── controllers.js               get rid of the clutter.
 * └── templates
 *     ├── browse.html     <----------------------------- no idea what this does
 *     ├── course.html     <------------------- added by cy. was 'playlist.html'
 *     ├── homepage.html   <------------------ added by cy. was 'playlists.html'
 *     ├── login.html
 *     ├── menu.html
 *     ├── page12.html
 *     ├── page2.html
 *     ├── page3.html
 *     ├── page6.html
 *     ├── page8.html
 *     ├── page9.html
 *     ├── playlist.html    <--------------------don't need, feel free to delete
 *     └── playlists.html   <------------------------------------------ likewise     
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
                templateUrl: 'templates/page9.html',
		controller: 'AssignmentsCtrl'
            }
        }
    })
/*\
 *
 *
 * * * * * previous cy's working stuff */

/* stuff from pull / * * * * * * * * * *
                                       *
                                       *
                                       *
                                      \*/
    .state('app.page8', {
        url: '/page8',
        views: {
            'menuContent': {
                templateUrl: 'templates/page8.html'
             }
        }
    })

    .state('app.wuttup', {
        url: '/wuttup',
        views: {
            'menuContent': {
                templateUrl: 'templates/page3.html'
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

/////////
///OOOO//
//OO//OO/
/////OO//
////OO///
/////////
////OO///
///////// are we keeping playlist ?
    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
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
  .state('app.page3', {
      url: '/page3',
      views: {
        'menuContent': {
          templateUrl: 'templates/page3.html'
        }
      }
  }) 

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
          templateUrl: 'templates/page5.html'
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
          templateUrl: 'templates/page12.html'
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
          /* end of new contentend */
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
			controller: 'RosterCtrl'
		}
	}
  }) ;

 /******* end of stuff from pull */

  $urlRouterProvider.otherwise('/app/homepage');
   }); 
