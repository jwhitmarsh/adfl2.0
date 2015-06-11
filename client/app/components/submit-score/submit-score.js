'use strict';

angular.module('adflApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('submit-score', {
				url: '/submit-score/:teamId',
				templateUrl: 'app/components/submit-score/submit-score.html',
				controller: 'SubmitScoreCtrl',
				resolve: {
					matches: function ($http, $stateParams) {
						return $http.get('/api/fixtures/by-team/' + $stateParams.teamId);
					}
				},
				data: {
					requireLogin: false
				}
			})
	});
