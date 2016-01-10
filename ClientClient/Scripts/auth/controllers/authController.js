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

            $scope.changeEmail = function () {

                authService.changeEmail($scope.mail).then(function (resp) {
                    var resp = resp;
                    $scope.passField = false;
                }, function (err) {
                    $scope.error = err.data.ModelState;
                    $scope.passField = true;
                    $scope.passText = "Пароль успешно изменен";
                });

                $scope.mail = {};
            };

            $scope.changePass = function () {
                
                authService.changePass($scope.pass).then(function (resp) {
                    var resp = resp;
                    $scope.passField = false;
                }, function (err) {
                    $scope.error = err.data.ModelState;
                    $scope.passField = true;
                    $scope.passText = "Пароль успешно изменен";
                });

                $scope.pass = {};
            };

            $scope.login = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                authService.login(user).then(function (response) {

                    var token = response.data;
                    localStorageService.set('token', token);
                    $scope.isLogin = true;
                });
            }

            $scope.logout = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                var token = localStorageService.get('token');
                var data = { Token: token, TokenObj: '' };
                authService.logout(data).then(function (response) {
                    $scope.pass = {};
                    localStorageService.remove('token');
                    $scope.isLogin = false;
                });
            }
        };

        module.controller(name, dependencies.concat(controller));

    });