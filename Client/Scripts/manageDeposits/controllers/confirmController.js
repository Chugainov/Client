define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.confirmController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.depositsService', 'id'];

    var controller = function ($uibModalInstance, $scope, depositsService, id) {




        $scope.ok = function () {
            depositsService.delete(id).then(function () {
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})