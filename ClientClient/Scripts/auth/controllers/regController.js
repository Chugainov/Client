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
            $scope.info = {};
            $scope.isReg = false;

            $scope.register = function () {
                var user = $scope.info;
                user.DocumentType = 1;
                authService.register(user).then(function (response) {
                    var temp = response;
                    $scope.status = response.status;
                    $scope.isReg = true;
                }, function (error) {
                    $scope.errors = error.data.ModelState;
                });
            }

            
        };

        module.controller(name, dependencies.concat(controller));

    });