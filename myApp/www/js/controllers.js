    /*
     * Controllers are only called when they are recreated or on app start,
     * instead of every page change. To listen for when this page is active
     * (for example, to refresh data), listen for the $ionicView.enter event:
     *
     *      $scope.$on('$ionicView.enter', function(e) {
     *      });
     * 
     */

angular.module('GradingApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    /*
     * Instantiate form and login modal, and put the form in the modal for
     * later use. */
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    /** close login page */
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    /** open login page */
    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

    /** simulate timeout because login is not implemented */
    $timeout(function()
    {
        $scope.closeLogin();
    }, 100);

  };
})

.controller('HomePageCtrl', function($scope, $ionicModal) {
    
    $ionicModal.fromTemplateUrl('templates/add_course.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.courses = [
        { title: 'ExampleCourse1', id: 1 },
        { title: 'ExampleCourse2', id: 2 },
        { title: 'ExampleCourse3', id: 3 },
    ];

    /** updated course list */
    $scope.add_course = function(title, id)
    {
        $scope.courses.push( { title, id } );
    }

    /** show add a course view */
    $scope.show_add_course = function()
    {
        $scope.modal.show();
    }

    /** return */
    $scope.close_add_course = function()
    {
        $scope.modal.hide();
    }

    console.log($scope);

})

.controller('AssignmentsCtrl', function($scope) {
    $scope.assignments = [
        { title: 'Assignment1', id: 1 },
        { title: 'Assignment2', id: 2 },
    ];
})

.controller('CourseCtrl', function($scope, $stateParams) {
});
