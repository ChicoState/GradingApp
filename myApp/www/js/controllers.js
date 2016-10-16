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
        { title: 'ExampleCourse', id: 1 },
        { title: 'ExampleCourse2', id: 2 },
        { title: 'ExampleCourse3', id: 3 }
    ];
})

.controller('CourseCtrl', function($scope $stateParams) {
}

.factory('setName', function() {
    var name;
    return {
        set: function(val) {
            this.name = val;
        }
        get: function() {
            return this.name;
        }
    }
});
