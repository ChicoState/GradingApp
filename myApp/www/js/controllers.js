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
        $timeout(function()
	{
	  $scope.closeLogin();
	}, 100);

    };
})

.controller('HomePageCtrl', function($scope, $ionicModal) {


    /** add a course functionality
     */
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

    /*function getAllCourses(){
	classList.getTodos()
	.then(function(result){
	  $scope.courses = result.data.data;
	});
    }*/

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
      /*classList.addClass($scope.input)
        .then(function(result){
	  $scope.course_data = {};
	  getAllCourses();
	});*/
        var id = $scope.courses.length;
        $scope.courses.push( { title, id } );
        title = "";
    };

    //getAllCourses();

    /** debug
     */
    console.log($scope);

})

.controller('AssignmentsCtrl', function($scope, $ionicModal) {
	$ionicModal.fromTemplateUrl('templates/page10.html', {
	scope: $scope
	}).then(function(modal)
	{
		$scope.modal = modal;
	});

	$scope.course_data = {};
	$scope.assignments = [];

	$scope.show_add_assignment = function(){
		$scope.modal.show();
	};
	$scope.close_add_assignment = function(){
		$scope.modal.hide();
	};
	$scope.add_assignment = function(name){
		var id = $scope.assignments.length
		$scope.assignments.push( { name, id } );
		name = "";
	};
	console.log($scope);

})

.controller('RosterCtrl', function($scope) {
	$scope.students = [
		{title: 'Student 1', id: 1},
		{title: 'Student 2', id: 2},
		{title: 'Student 3', id: 3}
	];
})

.controller('CourseCtrl', function($scope, $stateParams) {
});
