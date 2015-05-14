angular.module('adflApp')
	.directive('popover', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.popover({
				});
			}
		}
	});