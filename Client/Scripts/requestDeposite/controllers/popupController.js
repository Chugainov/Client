define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestDepositeService', 'request'];

    var controller = function ($uibModalInstance, $scope, requestDepositeService, request) {
        $scope.request = request;
        $scope.Role = role;
        requestService.getDeposits().then(function (response) {
            $scope.deposits = response.data.Items;
        });

        

        $scope.ok = function () {
            $scope.decision.CreditRequestId = request.Id;
            requestService.setStatus($scope.decision);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})