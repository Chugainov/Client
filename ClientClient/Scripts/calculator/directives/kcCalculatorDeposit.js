﻿define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcCalculatorDeposit';
        var dependencies = [namespace + '.calculatorService'];

        var directive = function (calculatorService) {
            var directive = {
                templateUrl: 'Scripts/calculator/templates/calculatorDeposit.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }



            function controller($scope, $timeout) {
                $scope.paymentsPlan = false;
                function _loadData() {
                    $scope._deposits = [];

                    $timeout(function () {
                        calculatorService.getDeposits().then(function (response) {
                            $scope._deposits = response.data;
                        });
                    });
                };

                _loadData();

                $scope.calc = function () {
                    var data = {
                        PercentRate: $scope.deposit.InterestRate,
                        Month: $scope.month,
                        Sum: $scope.sum
                    };
                    calculatorService.getCapitalizationPlan(data).then(function (response) {
                        $scope.paymentPlan = response.data;
                        $scope.capPlan = true;
                    });

                }
            };

        };

        module.directive(name, dependencies.concat(directive));
    });