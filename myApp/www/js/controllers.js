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
    $scope.input = {};
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
      classService.addClass($scope.input)
        .then(function(result){
	  $scope.input = {};
	  getAllCourses();
	});
    };

    $scope.delete_course = function(id)
    {
	classServicedeleteClass(id).then(function(result){
	  getAllCourses();
	});
    }

    getAllCourses();

    /** debug
     */
    console.log($scope);

})

.service('classService', function($http, Backand){
    var baseUrl = '/1/objects/';
    var objectName = 'classes/';

    function getUrl(){
	return Backand.getapiUrl + baseUrl + objectName;
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
