define([
        '../module',
        '../namespace'
],
    function (module, namespace) {
        'use strict';

        var controllerId = 'authController';
        var name = namespace + '.' + controllerId;
        var dependencies = ['$rootScope','$scope', 
            namespace + '.authService',
        'localStorageService'];
        var controller = function ($rootScope,$scope, authService, localStorageService) {
            var vm = this;

            var load = function () {
                authService.getRole().then(function (response) {
                    var Role = response.data.Role;

                    if (typeof (Role) == "undefined") {
                        $scope.isLogin = false;

                    }
                    else {
                        $scope.isLogin = true;
                        switch (Role) {
                            case "Admin":
                                $scope.Role = "Администратор";
                                break;
                            case "Operator":
                                $scope.Role = "Оператор";
                                break;
                            case "Security":
                                $scope.Role = "Сотрудник службы безопастности";
                                break;
                            case "CreditCommitteeMember":
                                $scope.Role = "Сотрудник кредитной комиссии";
                                break;
                            case "CreditDepartmentChief":
                                $scope.Role = "Начальник кредитной комиссии";
                                break;
                            case "Cashier":
                                $scope.Role = "Кассир";
                                break;
                        }
                    };

                });
            };
            load();
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
                    var token = response.data;
                    localStorageService.set('token', token);
                    $scope.isLogin = true;
                    load();
                    $rootScope.$emit('login');
                }, function (error) {
                    $scope.errors = error.data.ModelState || error.data;
                });
                
            }

            $scope.logout = function () {
                var user = { UserName: $scope.Name, Password: $scope.Password };
                var token = localStorageService.get('token');
                var data = { Token: token, TokenObj: '' };
                authService.logout().then(function (response) {
                    $scope.pass = {};
                    localStorageService.remove('token');
                    $scope.isLogin = false;
                    $rootScope.$emit('logout');
                });
                
            }
        };

        module.controller(name, dependencies.concat(controller));

    });