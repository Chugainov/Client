define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcPayments';
        var dependencies = [namespace + '.paymentsService'];

        var directive = function (depositsService) {
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

                function _loadData() {
                    var data = {
                        CreditId: $scope.credit.Id,
                        Month: $scope.month,
                        Sum: $scope.sum
                    };
                    $timeout(function () {

                        creditsService.getPaymentPlan(data).then(function (response) {
                            $scope.paymentPlan = response.data;
                        });
                    });
                };

                _loadData();

            };
        };
        module.directive(name, dependencies.concat(directive));
    });