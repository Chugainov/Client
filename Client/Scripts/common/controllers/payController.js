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
                payService.pay($scope.payment).then(function () {
                    $scope.step = 3;
                }, function (error) {
                    $scope.errors = error.data.ModelState;
                });
            };

            $scope.cancel = function () {
                $scope.step = $scope.step = 1;
                $scope.errors = null;
                $scope.info = {};
            };

            $scope.next = function () {
                if ($scope.step == 1 && $scope.payment) {
                    if (!$scope.payment.ContractNumber) {
                        return;
                    }
                    payService.getByContractNumber($scope.payment.ContractNumber).then(function (response) {
                        $scope.info = response.data;
                        $scope.step = 2;
                        $scope.errors = null;
                        $scope.payment.Sum = undefined;

                        $scope.info.FIO = $scope.info.Customer.Lastname + ' ' + $scope.info.Customer.Firstname + ' ' + $scope.info.Customer.Patronymic;
                        for (var i = 0; i < $scope.info.CreditPaymentPlanItems.length - 1; i++) {
                            if (!$scope.info.CreditPaymentPlanItems[i].IsPaid) {
                                $scope.info.currentPay = $scope.info.CreditPaymentPlanItems[i];

                                var paidMainSum = $scope.info.CreditPaymentPlanItems[i].CreditPayments
                                    .reduce(function (sum, item) {
                                        return sum + item.MainSum;
                                    }, 0);
                                $scope.info.currentPay.MainSum = $scope.info.currentPay.MainSum - paidMainSum;

                                var paidPercentSum = $scope.info.CreditPaymentPlanItems[i].CreditPayments
                                    .reduce(function (sum, item) {
                                        return sum + item.PercentSum;
                                    }, 0);
                                $scope.info.currentPay.PercentSum = $scope.info.currentPay.PercentSum - paidPercentSum;

                                if ($scope.info.currentPay.Debt) {
                                    var paidDelayMainSum = $scope.info.CreditPaymentPlanItems[i].CreditPayments
                                    .reduce(function (sum, item) {
                                        return sum + item.DelayMainSum;
                                    }, 0);
                                    $scope.info.currentPay.Debt.MainSum = $scope.info.currentPay.Debt.MainSum - paidDelayMainSum;

                                    var paidDelayPercentSum = $scope.info.CreditPaymentPlanItems[i].CreditPayments
                                    .reduce(function (sum, item) {
                                        return sum + item.DelayPercentSum;
                                    }, 0);
                                    $scope.info.currentPay.Debt.PercentSum = $scope.info.currentPay.Debt.PercentSum - paidDelayPercentSum;
                                }

                                $scope.info.currentPayDate = $scope.info.currentPay.StartDate;
                                break;
                            };
                        };

                    }, function (error) {
                        $scope.errors = error.data.Message;
                    });
                };

                if ($scope.step == 2) {
                    $scope.pay();
                }
                
            };
        };

        module.controller(name, dependencies.concat(controller));

    });