/** controllers.js
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
    
    $ionicModal.fromTemplateUrl('templates/add_course_page3.html', {
        scope: $scope
    }).then(function(modal)
    {
        $scope.modal = modal;
    });

    /** app data: need to tie in with json/database
     */
    $scope.course_data = {};
    $scope.courses = [];

    /** show add a course view
     */
    $scope.show_add_course = function()
    {
        $scope.modal.show();
    };

    /** return to homepage
     */
    $scope.close_add_course = function()
    {
        $scope.modal.hide();
    };

    /** update course list
     */
    $scope.add_course = function(title)
    {
        var id = $scope.courses.length;
        $scope.courses.push( { title, id } );
        title = "";
    };

    /** debug
     */
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
