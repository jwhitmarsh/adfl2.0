angular.module('adflApp')
	.controller('LoginModalCtrl', function ($scope, $http) {

		this.cancel = $scope.$dismiss;

		$scope.password = '';

		this.submit = function () {
			$http.post('/api/login', {password: $scope.password})
				.success(function () {
					$scope.$close(true);
				})
				.error(function () {
					$scope.$close();
				});
		};

	});