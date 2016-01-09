define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcPayments';
        var dependencies = [namespace + '.paymentsService'];

        var directive = function (paymentsService) {
            var directive = {
                templateUrl: 'Scripts/paymentPlan/templates/grid.html',
                link: link,
                restrict: 'EA',
                controller: controller,
                scope: {
                    customerId: "@"
                }
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

                        paymentsService.getByCustomer($scope.customerId).then(function (response) {
                            $scope.credits = response.data.Items;

                            $scope.credits.forEach(function (item) {

                                paymentsService.getByContractNumber(item.ContractNumber).then(function (response) {
                                    var data = response.data.CreditPaymentPlanItems;
                                    
                                    var Payments = [];
                                    data.forEach(function (item) {

                                        if (item.CreditPayments.length != 0) {
                                            Payments = Payments.concat(item.CreditPayments);

                                        }
                                    });
                                    item.Payments = Payments;

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