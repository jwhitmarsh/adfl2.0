angular.module('adflApp')
	.directive('adflPopover', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.popover({});
			}
		}
	});