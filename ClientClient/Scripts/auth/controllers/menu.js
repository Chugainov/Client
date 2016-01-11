define([
    '../module',
    '../namespace'
], function (module, namespace, app) {
    var name = 'kcMenu';
    var dependencies = [namespace + '.authService', 'localStorageService'];


    var directive = function (authService, localStorageService) {
        var directive = {
            templateUrl: 'Scripts/common/templates/menu.html',
            link: link,
            restrict: 'EA',
            controller: controller
        }
        return directive;

        function link(scope, el, attrs) {
            var temp = scope;
        }


        function controller($rootScope, $scope, $timeout) {
            $scope.timeShow = false;
            authService.getTime().then(function (response) {
                $scope.time = response.data;
                $scope.timeShow = true;
            });
            $scope.loginText = 'Войти';
            $rootScope.$on('login', function () {
                $scope.loginText = 'Личный кабинет';
            });
            $rootScope.$on('logout', function () {
                $scope.loginText = 'Войти';
            });
            setInterval(function () {
                $scope.$apply(function () {
                    authService.getTime().then(function (response) {
                        $scope.time = response.data;
                        $scope.timeShow = true;
                    });
                });
            }, 8500);


        };
    };
    module.directive(name, dependencies.concat(directive));
})

