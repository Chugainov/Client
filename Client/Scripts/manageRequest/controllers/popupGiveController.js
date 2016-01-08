define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupGiveController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestService', 'id'];

    var controller = function ($uibModalInstance, $scope, requestService, id) {

        
        

        $scope.ok = function () {
            requestService.giveCredit(id);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})