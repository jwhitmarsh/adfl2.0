'use strict';

angular.module('adflApp')
    .directive('siteMessage', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var messageContainer;

        return {
            templateUrl: 'app/shared/directives/site-message/site-message.html',
            restrict: 'E',
            scope: true,
            link: function (scope, element) {
                messageContainer = element.find('.message-container');
                messageContainer.hide();

                var _unregister;

                _unregister = $rootScope.$on('site-message', function (event, message) {
                    scope.message = message;
                    messageContainer.fadeIn();
                    $timeout(function () {
                        scope.dismiss();
                    }, 2500);
                });

                scope.$on('$destroy', _unregister);

                scope.dismiss = function () {
                    messageContainer.fadeOut();
                };
            }
        };
    }]);
