/** controllers.js
 */

var currentClass = {
	Id: null,
	Name: null,
	Class: null
};

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


.controller('HomePageCtrl', function($scope, $rootScope, $ionicModal, classService) {


    // add a course functionality
     
    $ionicModal.fromTemplateUrl('templates/add_course_page3.html', {
        scope: $scope
    }).then(function(modal)
    {
        $scope.modal = modal;
    });
    

    /*var changePage = function(page){
	$ionicModal.fromTemplateUrl(page, {
	    scope: $scope
	}).then(function(modal){
	    $scope.modal = modal;
	});
    };*/
    /** app data: need to tie in with json/database
     */
    $rootScope.classes = {};
    $rootScope.courses = [];

    function getAllCourses(){
	classService.getClasses()
	.then(function(result){
	  $rootScope.courses = result.data.data;
	});
    }

    /** show add a course view
     */
    $scope.show_add_course = function()
    {
	$scope.modal.show();
    };

    $scope.show_current_course = function(Id, Name){
	
	currentClass.Id = Id;
	currentClass.Name = Name;
    }

    /** return to homepage
     */
    $scope.close_add_course = function(test)
    {
        $scope.modal.hide();
    };

    /** update course list
     */
    $rootScope.add_course = function()
    {
      classService.addClass($rootScope.classes)
        .then(function(result){
	  $rootScope.classes = {};
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

.controller('AssignmentsCtrl', function($scope, $rootScope, $ionicModal, assignmentService) {
	$ionicModal.fromTemplateUrl('templates/page10.html', {
	scope: $scope
	}).then(function(modal)
	{
		$scope.modal = modal;
	});

	$rootScope.assignments = {};
	$rootScope.assignment = [];


    function getAllAssignments(){
	assignmentService.getAssignments()
	.then(function(result){
	  $rootScope.assignment = result.data.data;
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
      $rootScope.assignments.ClassName = currentClass.Class;
      assignmentService.addAssignment($rootScope.assignments)
        .then(function(result){
	  $rootScope.assignments = {};
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

.controller('studentsCtrl', function($scope, $rootScope, $ionicModal, studentsService) {

	$ionicModal.fromTemplateUrl('templates/page8.html', {
	scope: $scope
	}).then(function(modal)
	{
		$scope.modal = modal;
	});

	$rootScope.input = {};
	$rootScope.students = [];

    function getAllStudents(){
	studentsService.getStudents()
	.then(function(result){
	  $rootScope.students = result.data.data;
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
    $rootScope.add_student = function()
    {
      /*for (var i = 0; i < $rootScope.courses.length; i++){
	if ($rootScope.courses[i].id == currentClass.Id){
		$rootScope.courses[i].students
	}
      }*/
      $rootScope.input.ClassName = currentClass.Class;
      studentsService.addStudent($rootScope.input)
        .then(function(result)
	{
	  $rootScope.input = {};
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

.controller('CourseCtrl', function($scope, $rootScope, $stateParams, $ionicModal) {
	var id = $stateParams.courseId;

	currentClass.Id = id;
	for (var i = 0; i < $rootScope.courses.length; i++){
		if (currentClass.Id == $rootScope.courses[i].id){
			currentClass.Name = $rootScope.courses[i].ClassName;
			currentClass.Class = $rootScope.courses[i];
			console.log(currentClass.Name);
		}
	}

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
