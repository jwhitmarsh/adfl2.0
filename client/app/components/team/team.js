'use strict';

angular.module('adflApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('team', {
				url: '/team/:teamId',
				templateUrl: 'app/components/team/team.html',
				controller: 'TeamCtrl',
				resolve: {
					team: function ($http, $stateParams) {
						return $http.get('/api/teams/' + $stateParams.teamId);
					}
				}
			})
	});
