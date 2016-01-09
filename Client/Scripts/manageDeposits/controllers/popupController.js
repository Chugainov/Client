define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.depositsService', 'id'];

    var controller = function ($uibModalInstance, $scope, depositsService, id) {
        if (typeof (id) !== 'undefined') {
            depositsService.getById(id).then(function (response) {
                $scope.deposit = response.data;
            });
        } else {
            $scope.deposit = {
                Name: '',
                Description: '',
                InterestRate: '',
                MinSum: '',
                MaxSum: '',
                MinMonthPeriod: '',
                MaxMonthPeriod: ''
            };
        };


        $scope.ok = function () {
            if (typeof (id) === 'undefined') {
                depositsService.post($scope.deposit).then(function () {
                    $uibModalInstance.close();
                });
            } else {
                depositsService.put(id, $scope.deposit).then(function () {
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