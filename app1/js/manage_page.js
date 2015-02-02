angular.module('app1').controller('manage_pageCtrl', function ( $scope, parseDB, $mdDialog, messaging, events ) {
	
	$scope.pageGroups = [];
	$scope.page = {};
	$scope.pageFacebooks;
	
	var objAddGroup = { 
		'id' : '-999',
		'attributes' : {'name' : 'Add Group'}
	};

	var FBapiRetrievingDataFromMeGroupsSuccess = function (results) {
		console.log(results);
		$scope.$apply( function() {
			$scope.pageFacebooks = results.data;
			$scope.page.page = $scope.pageFacebooks[0];
		});
	};

	var groupTableUpdatedSuccess = function (results) {
		results.name = results.attributes.name;

		$scope.$apply( function () {
			$scope.pageGroups[ $scope.pageGroups.length-1 ] = results;
			$scope.pageGroups.push( objAddGroup );
		});
		
		console.log($scope.pageGroups);
	};

	var groupTableRetrieveSuccess = function (results) {
		console.log( results );
		$scope.pageGroups = results;
		$scope.pageGroups.push( objAddGroup );
		$scope.page.group = $scope.pageGroups[0];
	};

	var insertGroup_ok = function (answer) {
		var data = { 'name' : answer };
		parseDB.insertDataToGroupTable( data );
	};

	var insertGroup_cancel = function () {
		$scope.alert = 'You cancelled the dialog.';
	};

	$scope.selectManage_onClick = function (index) {
		
		$scope.content_page = index;
		
		if(index === 0) parseDB.FBapiRetrieveDataFromMeGroups(); // load Groups form facebook
	};

	$scope.insertPageButton_onClick = function () {
		var data = { 
			'pageFB' : $scope.page.page,
			'groupId': $scope.page.group.id 
		};
		
		parseDB.insertDataToPageTable( data );
	};

	$scope.$watch('page.group', function (newValue, oddValue) {
		
		if(newValue != null && newValue.id === '-999' ) {
			
			$mdDialog.show({
      			controller: DialogController,
      			templateUrl: 'views/dialog_addgroup_tmplate.html',
    		})
    		.then( insertGroup_ok , insertGroup_cancel);
		};
	});
	
	parseDB.retrieveDataFromGroupTable(); 
	
	messaging.subscribe( events.FBAPI.GROUP.message.RETRIEVE_SUCCESS , FBapiRetrievingDataFromMeGroupsSuccess );
	
	messaging.subscribe( events.DB.GROUP.message.RETRIEVE_SUCCESS , groupTableRetrieveSuccess );
	//messaging.publish( events.DB.GROUP.message.RETRIEVE_SUCCESS );
	messaging.subscribe( events.DB.GROUP.message.INSERT_SUCCESS , groupTableUpdatedSuccess );
	
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