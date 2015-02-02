angular.module('app1').controller('display_pageCtrl', function ($scope, $state, parseDB){
	console.log("display_page");
	console.log( parseDB );
	
	$scope.logout_onClick = function () {
		if( !parseDB.parseLogout() ) {
			$state.go('login_page')
		}
	}
})

.controller('panelGroupCtrl', function($scope){
	$scope.isshow = true;
	$scope.lists = [
		{
			id: '01',
			name: 'group1',
			data: [
					{id : '1', name: "111" },
					{id : '2', name: '222'}
				]
		},
		{
			id: '02',
			name: 'group2',
			data: [
				{id : '1', name: "111" },
				{id : '2', name: '222'}
			]
		}
	];

});


