angular.module('adflApp')
	.directive('toggleButton', function () {
		return {
			restrict: 'E',
			templateUrl: 'app/shared/directives/toggle-button/toggle-button.html',
			require: 'ngModel',
			scope: {
				label: '@',
				ngModel: '='
			},
			link: {
				pre: function (scope, element, attrs, ngModelCtrl) {
					element.on('click', function () {
						scope.$apply(scope.toggle);
					});

					scope.toggle = function toggle() {
						scope.ngModel = !scope.ngModel;
						//ngModelCtrl.$setViewValue(scope.model);
					};
				}
			}
		}
	});