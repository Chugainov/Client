define([
    '../module',
    '../namespace'
], function (module, namespace, app) {
    var name = namespace + '.menuController';

    var dependencies = [namespace + '.authService', '$scope', '$timeout'];

    var controller = function (authService, $scope, $timeout) {
        $scope.timeShow = false;
        authService.getTime().then(function (response) {
            $scope.time = response.data;
            $scope.timeShow = true;
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