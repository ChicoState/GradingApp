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
