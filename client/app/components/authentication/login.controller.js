angular.module('adflApp')
	.controller('LoginModalCtrl', function ($scope) {

		this.cancel = $scope.$dismiss;

		this.submit = function (email, password) {
			$scope.$close(true);
			//UsersApi.login(email, password)
			//	.then(function (user) {
			//
			//	});
		};

	});