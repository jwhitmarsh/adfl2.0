angular.module('adflApp')
	.controller('TeamCtrl', function ($scope, team, $http, SiteMessageService) {
		$scope.team = team.data;

		$scope.save = function () {
			$http.put('/api/teams/' + $scope.team._id, $scope.team)
				.success(function (res) {
					console.log(res);
					SiteMessageService.addMessage(res.msg, 1);
				})
				.error(function (e) {
					console.error(e);
				});
		}
	});