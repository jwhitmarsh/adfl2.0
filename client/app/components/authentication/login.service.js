angular.module('adflApp')
	.service('loginModal', function ($modal, $rootScope) {

		function assignCurrentUser(user) {
			$rootScope.currentUser = user;
			return user;
		}

		return function () {
			var instance = $modal.open({
				templateUrl: 'app/shared/views/loginModalTemplate.html',
				controller: 'LoginModalCtrl',
				controllerAs: 'LoginModalCtrl'
			});

			return instance.result.then(assignCurrentUser);
		};

	});