define([
        '../module',
        '../namespace'
],
    function (module, namespace) {
        'use strict';

        var controllerId = 'regController';
        var name = namespace + '.' + controllerId;
        var dependencies = ['$scope',
            namespace + '.authService',
        'localStorageService'];
        var controller = function ($scope, authService, localStorageService) {
            var vm = this;

            $scope.open = function ($event) {
                $scope.opened = true;
            };

            $scope.register = function () {
                var user = $scope.info;
                user.DocumentType = 1;
                authService.register(user).then(function (response) {
                    var temp = response;
                    $scope.status = response.status;
                });
            }

            //$scope.logout = function () {
            //    var user = { UserName: $scope.Name, Password: $scope.Password };
            //    var token = localStorageService.get('token');
            //    var data = { Token: token, TokenObj: '' };
            //    authService.logout(data).then(function (response) {

            //        localStorageService.remove('token');
            //    });
            //}
        };

        module.controller(name, dependencies.concat(controller));

    });