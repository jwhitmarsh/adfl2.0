'use strict';

angular.module('adflApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeCtrl'
			});
	});
