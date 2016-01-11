define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupGiveController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestService', 'id'];

    var controller = function ($uibModalInstance, $scope, requestService, id) {

        $scope.hasError = false;
        

        $scope.ok = function () {
            requestService.giveCredit(id).then(function () {
                $uibModalInstance.close();

            }, function (error) {
                $scope.hasError = true;
                $scope.error = error.data.Message;
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})