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
        'localStorageService', '$rootScope'];
        var controller = function ($scope, authService, localStorageService, $rootScope) {
            var vm = this;
            var token = localStorageService.get('token');
            if (token != null) {
                $scope.isLogin = true;
            } else {
                $scope.isLogin = false;
            }
            $scope.changeEmail = function () {

                authService.changeEmail($scope.mail).then(function (resp) {
                    var resp = resp;
                    $scope.mail = {};
                    $scope.successInfoE = 'E-mail изменен успешно.';
                }, function (error) {
                    $scope.errors = error.data.ModelState;
                    $scope.mail = {};
                });

                
            };

            $scope.changePass = function () {
                
                authService.changePass($scope.pass).then(function (resp) {
                    var resp = resp;
                    $scope.successInfo = 'Пароль изменен успешно.';
                    $scope.pass = {};
                }, function (error) {
                    $scope.errors = error.data.ModelState;
                    $scope.pass = {};
                });

                
            };

            $scope.login = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                authService.login(user).then(function (response) {
                    $rootScope.isLogin = true;
                    var token = response.data;
                    localStorageService.set('token', token);
                    $scope.isLogin = true;
                    $rootScope.$emit('login');
                }, function (error) {
                    $scope.errors = error.data.ModelState || error.data;
                });
            }

            $scope.logout = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                var token = localStorageService.get('token');
                var data = { Token: token, TokenObj: '' };
                authService.logout(data).then(function (response) {
                    $scope.pass = {};
                    $rootScope.isLogin = false;
                    localStorageService.remove('token');
                    $scope.isLogin = false;
                    $rootScope.$emit('logout');
                });
            }
        };

        module.controller(name, dependencies.concat(controller));

    });