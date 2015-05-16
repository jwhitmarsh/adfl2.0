angular.module('adflApp', ['ui.router', 'ui.bootstrap'])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	})
	.run(function ($rootScope, $state, loginModal) {

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;

			if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
				event.preventDefault();

				loginModal()
					.then(function () {
						return $state.go(toState.name, toParams);
					})
					.catch(function () {
						return $state.go('view');
					});
			}
		});
	});