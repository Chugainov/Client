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
                    $scope.credit;
                    $scope.month;
                    $scope.incomeSum;
                    $scope.otherCreditSum;
                    $scope.otherSum;
                    $scope.utilSum;
                    $timeout(function () {
                        creditsService.get().then(function (response) {
                            $scope._credits = response.data;
                        });
                    });
                };

                _loadData();

                $scope.calc = function () {
                    var data = {
                        CreditId: $scope.credit.Id,
                        Month: $scope.month,
                        IncomeSum: $scope.incomeSum,
                        OtherCreditSum: $scope.otherCreditSum,
                        OtherSum: $scope.otherSum,
                        UtilSum :$scope.utilSum
                    }
                    creditsService.getMaxSum(data).then(function (response) {
                        $scope.maxSum = Math.round(response.data);
                    });
                }
            };

        };

        module.directive(name, dependencies.concat(directive));
    });