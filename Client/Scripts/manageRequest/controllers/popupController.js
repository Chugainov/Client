﻿define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestService', 'request', 'role'];

    var controller = function ($uibModalInstance, $scope, requestService, request, role) {
        $scope.request = request;
        $scope.Role = role;

        $scope.isValid = function () {
            if (typeof ($scope.decision) == "undefined") return false;
            if (typeof ($scope.decision.CreditRequestStatusInfo) == "undefined") return false;
            if ($scope.decision.CreditRequestStatusInfo == "Accepted") return true;
            if (typeof ($scope.decision.Message) == "undefined") return false;
            if ($scope.decision.Message == "") return false;
            return true;
        };

        $scope.ok = function () {
            $scope.decision.CreditRequestId = request.Id;
            requestService.setStatus($scope.decision);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})