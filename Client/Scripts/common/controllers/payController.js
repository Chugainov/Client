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
            $scope.step = 1;

            $scope.pay = function () {
                payService.pay($scope.payment);
            };

            $scope.cancel = function () {
                $scope.step = $scope.step = 1;
                $scope.info = {};
            };

            $scope.next = function () {
                $scope.step = $scope.step + 1;
                if ($scope.step == 2) {
                    payService.getByContractNumber($scope.payment.ContractNumber).then(function (response) {
                        $scope.info = response.data;


                        $scope.info.FIO = $scope.info.Customer.Lastname + ' ' + $scope.info.Customer.Firstname + ' ' + $scope.info.Customer.Patronymic;
                        for (var i = 0; i < $scope.info.CreditPaymentPlanItems.length - 1; i++) {
                            if (!$scope.info.CreditPaymentPlanItems[i].IsPaid) {
                                $scope.info.currentPay = $scope.info.CreditPaymentPlanItems[i];
                                $scope.info.currentPayDate = $scope.info.currentPay.StartDate;
                                break;
                            };
                        };

                    });
                };

                if ($scope.step == 3) {
                    $scope.pay();
                }
                
            };
        };

        module.controller(name, dependencies.concat(controller));

    });