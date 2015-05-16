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
				},
				data: {
					requireLogin: false
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
				},
				data: {
					requireLogin: true // this property will apply to all children of 'app'
				}
			});
	});
