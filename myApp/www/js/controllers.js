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
	$scope.current_assignments = [];

    function getAllAssignments(){
	assignmentService.getAssignments()
	.then(function(result){
	  $rootScope.assignment = result.data.data;
          for (var i = 0; i < $rootScope.assignment.length; i++){
	      if (currentClass.Id == $rootScope.assignment[i].ClassName){
                  $scope.current_assignments.push($rootScope.assignment[i]);
	      }
	  }
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
	$scope.current_students = [];


    function getAllStudents(){
	studentsService.getStudents()
	.then(function(result){
	  $rootScope.students = result.data.data;
          for (var i = 0; i < $rootScope.students.length; i++){
              if (currentClass.Id == $rootScope.students[i].ClassName){
		  $scope.current_students.push($rootScope.students[i]);
               }
	  }
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
      $rootScope.input.ClassName = currentClass.Class;
      $rootScope.classes.students = $rootScope.input;
      console.log($rootScope.classes.students);
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
    console.log($rootScope.students.length);

    for (var i = 0; i < $rootScope.students.length; i++){
                        console.log($rootScope.students[i].ClassName.id);
		if (currentClass.Id == $rootScope.students[i].ClassName.id){
			console.log($rootScope.students[i].ClassName.id);
			$scope.current_students.push($rootScope.students[i]);
		}
    }

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
	console.log($rootScope.courses.length);
	for (var i = 0; i < $rootScope.courses.length; i++){
		if (currentClass.Id == $rootScope.courses[i].id){
			currentClass.Name = $rootScope.courses[i].ClassName;
			currentClass.Class = $rootScope.courses[i];
			console.log(currentClass.Name);
		}
	}

})
/*.controller('CameraCtrl', ['$scope','$cordovaFile', '$cordovaFileTransfer', '$cordovaCamera', '$http', CameraCtrl]){

	function CameraCtrl($scope, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $http){

		var me = this;
		me.current_image = '';
		me.image_description = '';
    me.detection_type = 'LABEL_DETECTION';

    me.detection_types = {
      LABEL_DETECTION: 'label',
      TEXT_DETECTION: 'text',
      LOGO_DETECTION: 'logo',
      LANDMARK_DETECTION: 'landmark'
    };

		var api_key = 'AIzaSyA4gFIhT0Wnhd1syXsp3q8lLsYBzOLrbhs';


		$scope.takePicture = function(){
      alert('detection type: ' + me.detection_type);

			var options = {
		  	destinationType: Camera.DestinationType.DATA_URL,
    		sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 500,
        targetHeight: 500,
        correctOrientation: true,
        cameraDirection: 0,
        encodingType: Camera.EncodingType.JPEG
			};

			$cordovaCamera.getPicture(options).then(function(imagedata){

				me.current_image = "data:image/jpeg;base64," + imagedata;
        me.image_description = '';
        me.locale = '';

				var vision_api_json = {
				  "requests":[
				    {
				      "image":{
				        "content": imagedata
				      },
				      "features":[
				        {
				          "type": me.detection_type,
				          "maxResults": 1
				        }
				      ]
				    }
				  ]
				};

				var file_contents = JSON.stringify(vision_api_json);
				 var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;
				 //var server = 'https://vision.googleapis.com/v1/images:annotate\?key\=' + api_key;


				 //alert('gonna post son');
				 	
				 // var config={
				 // 	headers : {
				 // 		'Content-Type': 'application/json'
				 // 	}
				 // };
					var headers = {
						'Content-Type': 'application/json'
					};
				 options.headers = headers;
			     // $scope.data = {};
			     // $scope.data.username = 'hey';

			        // var link = 'http://nikola-breznjak.com/_testings/ionicPHP/api.php';
			        // $http.post(link, {username : $scope.data.username}).then(function (res){
			        //     $scope.response = res.data;
			        //     alert($scope.response);
			        // });
				 // $http.post('http://httpbin.org/post',file_contents, config)
				 // .then(function(result){
				 // 	 alert('HEY posted');
				 // }, function(error){
				 // 	alert('error posting');
				 // });

				 // $http.post(server, file_contents)
				 // .then(function(result){
				 // 	alert('.then');
				 // 	alert('hehehe');
				 // 	//alert(result);
					// var res = JSON.parse(result.data);
					// //alert(res);
     //            	var key = me.detection_types[me.detection_type] + 'Annotations';
					// me.image_description = res.responses[0][key][0].description;
				 // 	alert('HEY posted');
				 // }, function(error){
				 // 	alert('error posting');
				 // });

				 $http({
				 	method: 'POST',
				 	url: server,
				 	data: file_contents
				 	//headers: options
				 }).then(function successCallback(result){
				    	//alert('.then');
				 // 	alert('hehehe');
				 // 	alert(result);
				 		//alert(result.status);
				 		//alert(result.data);
						var http_res = result.data;
						var res = result.data;
                		var key = me.detection_types[me.detection_type] + 'Annotations';

				    	me.image_description = res.responses[0][key][0].description;
				 		//alert('HEY posted');
				 }, function errorCallback(error){
				 	alert('error posting');
				  });
				 alert(http_res);
				  var res= JSON.parse(http_res);
				  var key = me.detection_types[me.detection_type] + 'Annotations';
				 me.image_description = res.responses[0][key][0].description;
				 //alert('image description: ' + me.image_description);

				// $cordovaFile.writeFile(
				// 	cordova.file.applicationStorageDirectory,
				// 	'file.json',
				// 	file_contents,
				// 	true
				// ).then(function(result){

				// 	var headers = {
				// 		'Content-Type': 'application/json'
				// 	};

				// 	options.headers = headers;

				// 	var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + api_key;
				// 	var filePath = cordova.file.applicationStorageDirectory + 'file.json';

				// 	$cordovaFileTransfer.upload(server, filePath, options, true)
				//   		.then(function(result){

    //             var res = JSON.parse(result.response);
    //             var key = me.detection_types[me.detection_type] + 'Annotations';

				//     		me.image_description = res.responses[0][key][0].description;
				// 	  }, function(err){
				// 	    alert('An error occured while uploading the file');
				// 	  });

				// }, function(err){
    //       alert('An error occured while writing to the file');
    //     });

			}, function(err){
			  alert('An error occured getting the picture from the camera');
			});


		}

	}

})*/;
