define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.creditsService', 'id'];

    var controller = function ($uibModalInstance, $scope, creditsService, id) {
        creditsService.getById(id).then(function (response) {
            $scope.credit = response.data;
        });


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})