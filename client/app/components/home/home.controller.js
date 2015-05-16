angular.module('adflApp')
	.controller('HomeCtrl', function ($scope, $http, $q, isEditMode, $state) {
		var controller = this;

		$scope.loading = true;
		$scope.isEditMode = isEditMode;
		$scope.fixtures = [];
		$scope.teams = [];
		$scope.tableData = [];

		$scope.filteredTeam = null;
		$scope.sortType = 'position';
		$scope.sortReverse = false;

		$scope.getMatchPopover = function (teamName) {
			var team = $scope.teams.filter(function (x) {
				return x.name === teamName;
			});
			if (team.length) {
				team = team[0];
				return '<p>' + team.p1 + ' & ' + team.p2 + '</p>' +
					'<a href="mailto:' + team.p1Email + ',' + team.p2Email + '" ><i class="fa fa-envelope"></i> Request Match</a>';
			}
		};

		$scope.save = function (fixture) {
			$http.put('/api/fixtures/' + fixture._id, fixture)
				.success(function (res) {
					$state.go('view');
					console.log(res);
				})
				.error(function (e) {
					console.error(e);
				});
		};

		$q.all([
			_getFixtures(),
			_getTeams()
		]).then(function () {
			_setTableData();
			$scope.loading = false;
		});

		function _getFixtures() {
			var d = $q.defer();
			$http.get('/api/fixtures', {cache: false})
				.success(function (data) {
					$scope.fixtures = data.sort(function (a, b) {
						return a.week - b.week;
					});
					d.resolve(true);
				})
				.error(function (e) {
					console.error(e);
					d.resolve(false);
				});
			return d.promise;
		}

		function _getTeams() {
			var d = $q.defer();
			$http.get('/api/teams', {cache: false})
				.success(function (data) {
					$scope.teams = data;
					d.resolve(true);
				})
				.error(function (e) {
					console.error(e);
					d.resolve(false);
				});
			return d.promise;
		}


		function _setTableData() {
			for (var t = 0; t < $scope.teams.length; t++) {
				var team = $scope.teams[t];

				var teamFixtures = _getFixturesByTeam(team, $scope.fixtures);

				team.played = 0;
				team.won = 0;
				team.lost = 0;
				team.drawn = 0;
				team.scored = 0;
				team.conceeded = 0;
				team.points = 0;
				team.totalScored = 0;
				team.totalConceeded = 0;
				team.aggregate = 0;
				team.form = [];
				team.nextOpponent = null;
				team.doughnuts = 0;

				for (var j = 0; j < teamFixtures.length; j++) {
					var round = teamFixtures[j];

					for (var k = 0; k < round.length; k++) {
						var fixture = round[k];

						if (fixture.home.score !== null) {
							team.played++;
							if (fixture.home.team === team.name) {
								team.scored = fixture.home.score;
								team.conceeded = fixture.away.score;
							} else {
								team.scored = fixture.away.score;
								team.conceeded = fixture.home.score;
							}

							team.totalScored += team.scored;
							team.totalConceeded += team.conceeded;

							if (team.scored > team.conceeded) {
								team.won++;
								team.points += 3;
								team.form.push('W');

								if (team.scored === 10 && team.conceeded === 0) {
									team.doughnuts += 1;
								}
							}
							else if (team.scored === team.conceeded) {
								team.drawn++;
								team.points += 1;
								team.form.push("D");
							}
							else {
								team.lost++;
								team.form.push("L");
							}
						} else {
							if (team.name !== 'BYE' && !team.nextOpponent && fixture.home.team === team.name && fixture.away.team !== 'BYE') {
								team.nextOpponent = fixture.away.team;
							}
							if (team.name !== 'BYE' && !team.nextOpponent && fixture.away.team === team.name && fixture.home.team !== 'BYE') {
								team.nextOpponent = fixture.home.team;
							}
						}
					}
				}

				team.aggregate = team.totalScored - team.totalConceeded;
			}

			$scope.teams = $scope.teams.sort(function (x, y) {
				var points = y.points - x.points;
				if (points != 0) {
					if (y.played == 0) {
						return -1;
					}
					if (x.played == 0) {
						return 1;
					}
					return points;
				}

				var agg = y.aggregate - x.aggregate;
				if (agg != 0) {
					if (y.played == 0) {
						return -1;
					}
					if (x.played == 0) {
						return 1;
					}
					return agg;
				}

				var score = y.scored - x.scored;
				if (score != 0) {
					if (y.played == 0) {
						return -1;
					}
					if (x.played == 0) {
						return 1;
					}
					return score;
				}

				var conceeded = y.conceeded - x.conceeded;
				if (conceeded != 0) {
					if (y.played == 0) {
						return -1;
					}
					if (x.played == 0) {
						return 1;
					}
					return conceeded;
				}

				var nameA = x.name.toLowerCase(), nameB = y.name.toLowerCase()
				if (nameA < nameB)
					return -1;
				if (nameA > nameB)
					return 1;
				return 0;
			});

			for (var t = 0; t < $scope.teams.length; t++) {
				$scope.teams[t].position = t + 1;
			}
		}

		function _sortTeams() {

		}


		function _getFixturesByTeam(team, fixtures) {
			var teamFixtures = [];
			for (var j = 0; j < fixtures.length; j++) {
				var round = fixtures[j];

				var filteredFixtures = round.matches.filter(function (x) {
					return x.home.team === team.name || x.away.team === team.name;
				});
				teamFixtures.push(filteredFixtures);
			}
			return teamFixtures;
		}
	});