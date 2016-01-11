define([
    '../module',
    '../namespace'
], function (module, namespace, app) {
    var name = namespace + '.menuController';

    var dependencies = [namespace + '.authService', '$scope', '$rootScope', '$timeout', 'localStorageService'];

    var controller = function (authService, $scope, $rootScope, $timeout, localStorageService) {
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
    module.controller(name, dependencies.concat(controller));
})