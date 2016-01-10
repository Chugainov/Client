define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcCalculator';
        var dependencies = [namespace + '.calculatorService'];

        var directive = function (calculatorService) {
            var directive = {
                templateUrl: 'Scripts/calculator/templates/calculatorCredit.html',
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
                    $scope._credits = [];

                    $timeout(function () {
                        calculatorService.getCredits().then(function (response) {
                            $scope._credits = response.data;
                        });
                    });
                };

                _loadData();

                $scope.calc = function () {
                    if ($scope.type == 1) {
                        $scope.paymentsPlan = false;
                        var data = {
                            CreditId: $scope.credit ? $scope.credit.Id : null,
                            Month: $scope.month,
                            IncomeSum: $scope.incomeSum,
                            OtherCreditSum: $scope.otherCreditSum,
                            OtherSum: $scope.otherSum,
                            UtilSum: $scope.utilSum
                        }
                        calculatorService.getMaxSum(data).then(function (response) {
                            $scope.maxSum = Math.round(response.data);
                        }, function (error) {
                            $scope.errors = error.data.ModelState;
                        });
                    };
                    if ($scope.type == 2) {
                        $scope.paymentsPlan = false;
                        var data = {
                            CreditId: $scope.credit ? $scope.credit.Id : null,
                            Month: $scope.month,
                            Sum: $scope.sum,
                            OtherCreditSum: $scope.otherCreditSum,
                            OtherSum: $scope.otherSum,
                            UtilSum: $scope.utilSum
                        }
                        calculatorService.getIncomeReq(data).then(function (response) {
                            $scope.incomeReq = Math.round(response.data);
                        }, function (error) {
                            $scope.errors = error.data.ModelState;
                        });
                    }
                    if ($scope.type == 3) {
                        var data = {
                            CreditId: $scope.credit ? $scope.credit.Id : null,
                            Month: $scope.month,
                            Sum: $scope.sum
                        };
                        calculatorService.getPaymentPlan(data).then(function (response) {
                            $scope.paymentPlan = response.data;
                            $scope.paymentsPlan = true;
                        }, function (error) {
                            $scope.errors = error.data.ModelState;
                        });
                    }
                }
            };

        };

        module.directive(name, dependencies.concat(directive));
    });