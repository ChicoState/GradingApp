(function(){
	angular.module('GradingApp')
	.controller('HomeController', ['$scope','$cordovaFile', '$cordovaFileTransfer', '$cordovaCamera', '$http', HomeController]);

	function HomeController($scope, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $http){

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

})();