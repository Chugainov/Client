define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestService', 'id'];

    var controller = function ($uibModalInstance, $scope, requestService, id) {
        if (typeof (id) !== 'undefined') {
            requestService.getById(id).then(function (response) {
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
                requestService.post($scope.deposit);
            } else {
                requestService.put(id, $scope.deposit);
            };
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})