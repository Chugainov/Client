define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.confirmController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.authService', 'id'];

    var controller = function ($uibModalInstance, $scope, authService, id) {




        $scope.ok = function () {
            authService.delete(id).then(function () {
                $uibModalInstance.close();
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})