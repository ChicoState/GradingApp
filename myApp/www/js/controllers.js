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
    $scope.closeLogin = function() { // close login page
        $scope.modal.hide();
    };
    $scope.login = function() { // open login page
        $scope.modal.show();
    };
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
    $timeout(function() { // timeout to simulate login wait
        $scope.closeLogin();
    }, 100);
  };
})

.controller('HomePageCtrl', function($scope) {
    $scope.courses = [
        { title: 'ExampleCourse1', id: 1 },
        { title: 'ExampleCourse2', id: 2 },
        { title: 'ExampleCourse3', id: 3 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AssignmentsCtrl', function($scope) {
    $scope.assignments = [
        { title: 'Assignment1', id: 1 },
        { title: 'Assignment2', id: 2 },
        { title: 'Assignment3', id: 3 },
        { title: 'Assignment4', id: 4 },
        { title: 'Assignment5', id: 5 },
        { title: 'Assignment2', id: 2 },
        { title: 'Assignment3', id: 3 },
        { title: 'Assignment4', id: 4 },
        { title: 'Assignment5', id: 5 },
        { title: 'Assignment6', id: 6 }
    ];
})

.controller('CourseCtrl', function($scope, $stateParams) {
});
