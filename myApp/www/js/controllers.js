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

.controller('HomePageCtrl', function($scope, $ionicModal, classService) {


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
    $scope.classes = {};
    $scope.courses = [];

    /*function dataService($http, Backand){
	var vm = this;

	vm.getList = function(name, sort, filter){
	  return $http({
	    method: 'GET',
	    url: Backand.getApiUrl() + '/1/objects/' + name,
	    params: {
		pageSize: 20,
		pageNumber: 1,
		filter: filter || '',
		sort: sort || ''
	    }
	  });
	}
    }*/

    function getAllCourses(){
	classService.getClasses()
	.then(function(result){
	  $scope.courses = result.data.data;
	});
    }

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
    $scope.add_course = function()
    {
      classService.addClass($scope.classes)
        .then(function(result){
	  $scope.classes = {};
	  getAllCourses();
	});
    };

    $scope.delete_course = function(id)
    {
	classService.deleteClass(id).then(function(result){
	  getAllCourses();
	});
    }

    getAllCourses();

    /** debug
     */

})

.service('classService', function($http, Backand){
    var baseUrl = '/1/objects/';
    var objectName = 'classes/';

    function getUrl(){
	return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id){
	return getUrl() + id;
    }

    getClasses = function(){
	return $http.get(getUrl());
    }

    addClass = function(title){
	return $http.post(getUrl(), title);
    }

    deleteClass = function(id){
	return $http.delete(getUrlForId(id));
    }

    return {
	getClasses: getClasses,
	addClass: addClass,
	deleteClass: deleteClass
    }

})

.controller('AssignmentsCtrl', function($scope, $ionicModal, assignmentService) {
	$ionicModal.fromTemplateUrl('templates/page10.html', {
	scope: $scope
	}).then(function(modal)
	{
		$scope.modal = modal;
	});

	$scope.input = {};
	$scope.assignment = [];


    function getAllAssignments(){
	assignmentService.getAssignments()
	.then(function(result){
	  $scope.assignment = result.data.data;
	});
    }

    /** show add a course view
     */
    $scope.show_add_assignment = function()
    {
        $scope.modal.show();
    };

    /** return to homepage
     */
    $scope.close_add_assignment = function()
    {
        $scope.modal.hide();

    };

    /** update course list
     */
    $scope.add_assignment = function()
    {
      assignmentService.addAssignment($scope.input)
        .then(function(result){
	  $scope.input = {};
	  getAllAssignments();
	});

    };

    $scope.delete_Assignment = function(id)
    {
	assignmentService.deleteAssignment(id).then(function(result){
	  getAllAssignments();
	});
    }

    getAllAssignments();

})

.service('assignmentService', function($http, Backand){
    var baseUrl = '/1/objects/';
    var objectName = 'assignments/';

    function getUrl(){
	return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id){
	return getUrl() + id;
    }

    getAssignments = function(){
	return $http.get(getUrl());
    }

    addAssignment = function(title){
	return $http.post(getUrl(), title);
    }

    deleteAssignment = function(id){
	return $http.delete(getUrlForId(id));
    }

    return {
	getAssignments: getAssignments,
	addAssignment: addAssignment,
	deleteAssignment: deleteAssignment
    }

})

.controller('studentsCtrl', function($scope, $ionicModal, studentsService) {

	$ionicModal.fromTemplateUrl('templates/page8.html', {
	scope: $scope
	}).then(function(modal)
	{
		$scope.modal = modal;
	});

	$scope.input = {};
	$scope.students = [];

    function getAllStudents(){
	studentsService.getStudents()
	.then(function(result){
	  $scope.students = result.data.data;
	});
    }

    /** show add a course view
     */
    $scope.show_add_student = function()
    {
        $scope.modal.show();
    };

    /** return to homepage
     */
    $scope.close_add_student = function()
    {
        $scope.modal.hide();

    };

    /** update course list
     */
    $scope.add_student = function()
    {
      studentsService.addStudent($scope.input)
        .then(function(result){
	  $scope.input = {};
	  getAllStudents();
	});
    };

    $scope.delete_student = function(id)
    {
	  studentsService.deleteStudent(id).then(function(result){
	  getAllStudents();
	});
    }

    getAllStudents();

})

.service('studentsService', function($http, Backand){
    var baseUrl = '/1/objects/';
    var objectName = 'students/';

    function getUrl(){
	return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getUrlForId(id){
	return getUrl() + id;
    }

    getStudents = function(){
	return $http.get(getUrl());
    }

    addStudent = function(title){
	return $http.post(getUrl(), title);
    }


    deleteStudent = function(id){
	return $http.delete(getUrlForId(id));
    }

    return {
	getStudents: getStudents,
	addStudent: addStudent,
	deleteStudent: deleteStudent
    }

})

.controller('CourseCtrl', function($scope, $stateParams, $ionicModal) {


})
.controller("CameraController", function ($scope, $cordovaCamera) {
 
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            });
