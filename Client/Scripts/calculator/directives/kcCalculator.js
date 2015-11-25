define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcCalculator';
        var dependencies = [namespace + '.creditsService'];

        var directive = function (creditsService) {
            var directive = {
                templateUrl: 'Scripts/calculator/templates/calculator.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }



            function controller($scope, $timeout) {

                function _loadData() {
                    $scope._credits = [];

                    $timeout(function () {
                        creditsService.get().then(function (response) {
                            $scope._credits = response.data;
                        });
                    });
                };

                _loadData();

                $scope.calc = function () {
                    if ($scope.type == 1) {
                        var data = {
                            CreditId: $scope.credit.Id,
                            Month: $scope.month,
                            IncomeSum: $scope.incomeSum,
                            OtherCreditSum: $scope.otherCreditSum,
                            OtherSum: $scope.otherSum,
                            UtilSum: $scope.utilSum
                        }
                        creditsService.getMaxSum(data).then(function (response) {
                            $scope.maxSum = Math.round(response.data);
                        });
                    };
                    if ($scope.type == 2) {
                        var data = {
                            CreditId: $scope.credit.Id,
                            Month: $scope.month,
                            Sum: $scope.sum,
                            OtherCreditSum: $scope.otherCreditSum,
                            OtherSum: $scope.otherSum,
                            UtilSum: $scope.utilSum
                        }
                        creditsService.getIncomeReq(data).then(function (response) {
                            $scope.incomeReq = Math.round(response.data);
                        });
                    }
                    if ($scope.type == 3) {
                        var data = {
                            CreditId: $scope.credit.Id,
                            Month: $scope.month,
                            Sum: $scope.sum
                        };
                        creditsService.getPaymentPlan(data).then(function (response) {
                            $scope.paymentPlan = response.data;
                        });
                    }
                }
            };

        };

        module.directive(name, dependencies.concat(directive));
    });