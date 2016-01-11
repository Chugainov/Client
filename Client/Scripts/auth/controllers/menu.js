define([
    '../module',
    '../namespace'
], function (module, namespace, app) {
    var name = namespace + '.menuController';

    var dependencies = [namespace + '.authService', '$rootScope', '$scope', '$timeout', 'localStorageService'];

    var controller = function (authService, $rootScope, $scope, $timeout, localStorageService) {
        $scope.timeShow = false;
        authService.getTime().then(function (response) {
            $scope.time = response.data;
            $scope.timeShow = true;
        });
        var token = localStorageService.get('token');
        if ((typeof (token) != "null") || (typeof (token) != "undefined")) {

            $scope.loginText = 'Личный кабинет';
        } else {
            $scope.loginText = 'Войти';
        }
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