angular.module('adflApp')
	.directive('adflMatch', function () {
		return {
			restrict: 'E',
			templateUrl: 'app/shared/directives/adfl-match/adfl-match.html',
			scope: {
				match: '=',
				isEditMode: '=',
				getMatchPopover: '&'
			},
			link: {
				pre: function (scope, element, attrs) {
					var match = scope.match,
						homeClass,
						awayClass;

					if (match.home.score > match.away.score) {
						homeClass = 'win';
						awayClass = 'lose';
					}

					if (match.home.score < match.away.score) {
						homeClass = 'lose';
						awayClass = 'win';
					}

					if (match.home.score !== null && match.home.score === match.away.score) {
						homeClass = 'draw';
						awayClass = 'draw';
					}

					if (match.home.score === 10 && match.away.score === 0) {
						homeClass = 'doughnut';
					}

					if (match.away.score === 10 && match.home.score === 0) {
						awayClass = 'doughnut';
					}

					var homeElement = element.find('.home')
						.addClass(homeClass);

					var awayElement = element.find('.away')
						.addClass(awayClass);

					if (!scope.isEditMode) {
						homeElement.popover({
							content: scope.getMatchPopover()(match.home.team),
							trigger: 'click',
							placement: 'top',
							html: true
						});

						awayElement.popover({
							content: scope.getMatchPopover()(match.away.team),
							trigger: 'click',
							placement: 'top',
							html: true
						});
					}
				}
			}
		}
	});