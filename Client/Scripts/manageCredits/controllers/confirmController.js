define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.confirmController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.creditsService', 'id'];

    var controller = function ($uibModalInstance, $scope, creditsService, id) {




        $scope.ok = function () {
            creditsService.delete(id);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})