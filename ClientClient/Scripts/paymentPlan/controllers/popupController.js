define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.paymentsService', 'contractNumber'];

    var controller = function ($uibModalInstance, $scope, paymentsService, contractNumber) {
        paymentsService.getByContractNumber(contractNumber).then(function (response) {
            $scope.data = response.data.CreditPaymentPlanItems;
            console.log($scope.data);
        });


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})