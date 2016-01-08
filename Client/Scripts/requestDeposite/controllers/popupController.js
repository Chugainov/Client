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

        $scope.openCalendar1 = function ($event) {
            $scope.opened1 = true;
        };
        $scope.openCalendar2 = function ($event) {
            $scope.opened2 = true;
        };
        $scope.openCalendar3 = function ($event) {
            $scope.opened3 = true;
        };
        $scope.Set = function () {
            requestDepositeService.getCustomer($scope.customer.IdentificationNumber).then(function (responce) {
                $scope.customer = responce.data;
            })
        };
        $scope.add = function () {
            $scope.requestN.Customer = $scope.customer;
            $scope.requestN.Customer.DocumentType = 0;
            $scope.requestN.Currency = 0;
            $scope.requestN.DepositId = $scope.deposit.Id;
            requestDepositeService.add($scope.requestN);
        };

        $scope.ok = function () {
            $scope.add();
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})