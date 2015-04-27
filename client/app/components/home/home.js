'use strict';

angular.module('adflApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				abstract: true,
				url: '',
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeCtrl'
			})
			.state('view', {
				url: '/',
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeCtrl',
				resolve: {
					isEditMode: function () {
						return false;
					}
				}
			})
			.state('edit', {
				url: '/edit',
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeCtrl',
				resolve: {
					isEditMode: function () {
						return true;
					}
				}
			});
	});
