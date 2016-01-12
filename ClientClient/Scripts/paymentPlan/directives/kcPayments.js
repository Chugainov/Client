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

                        paymentsService.getByCustomer(page).then(function (response) {
                            $scope.credits = response.data.Items;

                            $scope.credits.forEach(function (item) {

                                paymentsService.getByContractNumber(item.ContractNumber).then(function (response) {
                                    var data = response.data.CreditPaymentPlanItems;

                                    var Payments = [],
                                        nextPayment;
                                    data.forEach(function (item, index) {

                                        nextPayment = item.CreditPayments[index];
                                        if (item.CreditPayments.length != 0) {
                                            var payment = item.CreditPayments.map(function (obj) {
                                                var item = obj;
                                                item.PaymentPlanNumber = index;
                                                return item;
                                            });
                                            Payments = Payments.concat(payment);
                                        }
                                    });
                                    for (var i = 0; i < data.length - 1; i++) {
                                        if (!data[i].IsPaid) {
                                            item.nextPayment = data[i];
                                            break;
                                        };
                                    };
                                    item.Payments = Payments;

                                });
                            });

                        });
                    });
                };

                _loadData(1);

                $scope.details = function (ContractNumber, Payments) {
                    if ($scope.showDetails != ContractNumber) {
                        if (!Payments) {
                            $scope.hasPayments = false;
                        } else if (!Payments.length){
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

                $scope.animationsEnabled = true;

                $scope.open = function (contractNumber) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/paymentPlan/templates/popup.html',
                        controller: 'Client.payments.popupController',
                        resolve: {
                            contractNumber: function () {
                                return contractNumber;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $timeout(function () { return; });

                    }, function () {
                        //TODO:
                    });
                };
            };
        };
        module.directive(name, dependencies.concat(directive));
    });