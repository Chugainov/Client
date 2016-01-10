define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.depositsService', 'id'];

    var controller = function ($uibModalInstance, $scope,depositsService, id) {

        depositsService.getById(id).then(function (response) {
            $scope.deposit = response.data;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})