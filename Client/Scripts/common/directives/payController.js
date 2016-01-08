define([
        '../module',
        '../namespace'
],
    function (module, namespace) {
        'use strict';

        var controllerId = 'payController';
        var name = namespace + '.' + controllerId;
        var dependencies = ['$scope',
            namespace + '.payService'
        ];
        var controller = function ($scope, payService) {
            var vm = this;

            $scope.pay = function () {
                payService.pay($scope.payment);
            };
        };

        module.controller(name, dependencies.concat(controller));

    });