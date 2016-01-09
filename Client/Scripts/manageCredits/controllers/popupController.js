define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.creditsService', 'id'];

    var controller = function ($uibModalInstance, $scope, creditsService, id ) {
        if (typeof (id) !== 'undefined') {
            creditsService.getById(id).then(function (response) {
                $scope.credit = response.data;
            });
        } else {
            $scope.credit = {
                Name: '',
                Description: '',
                PercentRate: '',
                MinSum: '',
                MaxSum: '',
                MinMonthPeriod: '',
                MaxMonthPeriod: '',
                PaymentTypeId: 1
            };
        };
        

        $scope.ok = function () {
            if (typeof (id) === 'undefined') {
                creditsService.post($scope.credit).then(function () {
                    $uibModalInstance.close();
                });
            } else {
                creditsService.put(id, $scope.credit).then(function () {
                    $uibModalInstance.close();
                });
            };
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})