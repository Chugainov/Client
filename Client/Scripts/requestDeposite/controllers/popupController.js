define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestDepositeService'];

    var controller = function ($uibModalInstance, $scope, requestDepositeService) {

        requestDepositeService.getDeposits().then(function (response) {
            $scope._deposits = response.data;
        });


        $scope.requestN = {
            Customer: {}
        };

        $scope.openCalendar3 = function ($event) {
            $scope.opened3 = true;
        };
        $scope.Set = function () {
            requestDepositeService.getCustomer($scope.customer.IdentificationNumber).then(function(responce) {
                if (responce.data === null) {
                    var identNumber = $scope.customer.IdentificationNumber;
                    $scope.customer = new Object();
                    $scope.customer.IdentificationNumber = identNumber;
                } else {
                    $scope.customer = responce.data;
                }
            });
        };
        $scope.set = function () {
            $scope.requestN.Customer = $scope.customer || {
                Address: {}
            };
            $scope.requestN.Customer.DocumentType = 0;
            $scope.requestN.Currency = 0;
            $scope.requestN.DepositId = $scope.deposit ? $scope.deposit.Id : -1;
            
        };

        $scope.ok = function () {
            $scope.set();
            requestDepositeService.add($scope.requestN).then(function () {
                $uibModalInstance.close();
            }, function (error) {
                $scope.errors = error.data.ModelState;
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})