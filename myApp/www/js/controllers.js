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
})
.controller("CameraController", function ($scope, $ionicModal, $cordovaFile, $cordovaFileTransfer, $cordovaCamera) {
 	
	var me = this;
	me.current_image = '';
	me.image_description = '';
	me.detection_type = 'LABEL_DETECTION';

	me.detection_types = {
		//LABEL_DETECTION: 'label',
		TEXT_DETECTION: 'text',
		//LOGO_DETECTION: 'logo',
		//LANDMARK_DETECTION: 'landmark'
	};
	
	//need our google api key
	//var api_key = 'your-google-api-key';

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
                        me.current_image = "data:image/jpeg;base64," + imageData;

			var vision_api_json = {
			  "requests":[
			   {
			    "image":{
			      "content": imageData
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

			$cordovaFile.writeFile(
			    cordova.file.applicationStorageDirectory,
			    'file.json',
			    file_contents,
			    true
			).then(function(result){
			    var header = {
				'Content-Type': 'application/json'
			    };

			    options.headers = headers;

	/*		    var server = 'https://vision.googleapis.com/v1/images:annotate?key=' = api_key;
			    var filePath = cordova.file.applicationStorageDirectory + 'file,json';
			    $cordovaFileTranser.upload(server, filePath, options, true)
			        .then(function(result){
					var res = JSON.parse(result.response);
					var key = me.detection_types[me.detection_type] + 'Annotations';
					me.image_description = res.responses[0][key][0].description;
				     }
				)*/
			     }
			 )
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
