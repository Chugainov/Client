define([
        '../module',
        '../namespace'
],
    function (module, namespace) {
        'use strict';

        var controllerId = 'authController';
        var name = namespace + '.' + controllerId;
        var dependencies = ['$scope', 
            namespace + '.authService',
        'localStorageService'];
        var controller = function ($scope, authService, localStorageService) {
            var vm = this;

            $scope.login = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                authService.login(user).then(function (response) {

                    var token = response.data;
                    localStorageService.set('token', token);
                });
            }

            $scope.logout = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                var token = localStorageService.get('token');
                var data = { Token: token, TokenObj: '' };
                authService.logout(data).then(function (response) {

                    localStorageService.remove('token');
                });
            }
        };

        module.controller(name, dependencies.concat(controller));

    });