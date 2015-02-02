angular.module('app1').controller('manage_pageCtrl', function ( $scope, parseDB, $mdDialog, messaging, events ) {
	
	$scope.pageGroups = [
		{ 'id' : '0' , 	'name' : "group0"},
		{ 'id' : '1' , 	'name' : "group1"},
		{ 'id' : '2' , 	'name' : "group2"},
		{ 'id' : '-999','name' : "Add Group" }
	];
	$scope.page = {};
	$scope.page.group = $scope.pageGroups[0];

	$scope.selectManage_onClick = function (index) {
		$scope.content_page = index;
	};

	var insertGroup_ok = function (answer) {
		var data = { 'name' : answer };
		parseDB.insertDataToGroupTable( data );
	};

	var insertGroup_cancel = function () {
		$scope.alert = 'You cancelled the dialog.';
	};

	var groupTableUpdatedSuccess = function (results) {
		console.log( results );
		results.name = results.attributes.name;
		$scope.pageGroups.push(results);
		console.log($scope.pageGroups);

	};

	messaging.subscribe(events.DB.GROUP.message.INSERT_SUCCESS , groupTableUpdatedSuccess);
	

	$scope.$watch('page.group', function (newValue, oddValue) {
		if(newValue.id === '-999' ) {
			
			$mdDialog.show({
      			controller: DialogController,
      			templateUrl: 'views/dialog_addgroup_tmplate.html',
    		})
    		.then( insertGroup_ok , insertGroup_cancel);
		};
	});
});

function DialogController($scope, $mdDialog) {
	$scope.hide = function () {
    	$mdDialog.hide();
  	};
  
  	$scope.cancel = function () {
    	$mdDialog.cancel();
  	};
  
  	$scope.answer = function (answer) {
    	$mdDialog.hide(answer);
  	};
}