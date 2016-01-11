define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcPaymentsD';
        var dependencies = [namespace + '.paymentsService'];

        var directive = function (paymentsService) {
            var directive = {
                templateUrl: 'Scripts/paymentPlan/templates/gridD.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }



            function controller($scope, $uibModal, $timeout) {

                function _loadData(page) {
                    $scope.showDetails = -100;
                    $scope._currentPage = page;
                    $scope.hasPayments = false;
                    $timeout(function () {

                        paymentsService.getByCustomerD(page).then(function (response) {
                            $scope.deposits = response.data.Items;

                            $scope.deposits.forEach(function (item) {
                                item.Status = item.IsPaid ? "Завершён" : "Действует";
                                paymentsService.getByContractNumberD(item.ContractNumber).then(function (response) {
                                    var data = response.data.DepositPayments;
                                    var sum = 0;
                                    data.forEach(function (item) {
                                        sum += item.Sum;
                                    });
                                    item.Sum = sum;
                                    item.Payments = data;


                                });
                            });

                        });
                    });
                };

                _loadData(1);

                $scope.details = function (ContractNumber, Payments) {
                    if ($scope.showDetails != ContractNumber) {
                        if (Payments.length == 0) {
                            $scope.hasPayments = false;
                        } else {

                            $scope.hasPayments = true;
                        }
                        $scope.showDetails = ContractNumber;
                    } else {
                        $scope.showDetails = -100;
                        $scope.hasPayments = false;
                    }

                };
            };
        };
        module.directive(name, dependencies.concat(directive));
    });