angular.module('app1').directive('menuPanel', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {
		 	lists: '&lists'
		 }, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'directive/menu_panel/menu_panel.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, elment, attrs) {
			scope.isshow = false;
			console.log(scope.lists());
			scope.showList_onClick = function() {
				scope.isshow = !scope.isshow;
			}
		}
	};
})