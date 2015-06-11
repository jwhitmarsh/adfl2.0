angular.module('adflApp')
	.controller('SubmitScoreCtrl', function ($scope, matches, $http, SiteMessageService) {
		$scope.isEditMode = true;

		$scope.matches = matches.data;
	});