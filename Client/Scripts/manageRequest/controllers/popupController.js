define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.requestService', 'request', 'role', 'unconfirmed'];

    var controller = function ($uibModalInstance, $scope, requestService, request, role, unconfirmed) {
        $scope.request = request;
        $scope.Role = role;
        $scope.unconfirmed = unconfirmed;
        
        requestService.getSolvencyRate(request).then(function (responce) {
            $scope.solvency = responce.data.solvency;
            if ($scope.solvency) {
                $scope.solvencyText = "Рейтинг платежеспособности позволяет выдать кредит этому клиенту.";
            }
            else {
                $scope.solvencyText = "Рейтинг платежеспособности низкий. Выдавать кредит на свой страх и риск.";
            }
        });

        $scope.hasCustomerCredits = function () {
            if (role == 3) return false;
            if (typeof ($scope.customersCredits) == "undefined") return false;
            if (typeof ($scope.customersCredits) == "null") return false;
            if ($scope.customersCredits.length == 0) return false;
            return true;
        };

        $scope.isValid = function () {
            if (typeof ($scope.decision) == "undefined") return false;
            if (typeof ($scope.decision.CreditRequestStatusInfo) == "undefined") return false;
            if ($scope.decision.CreditRequestStatusInfo == "Accepted") return true;
            if (typeof ($scope.decision.Message) == "undefined") return false;
            if ($scope.decision.Message == "") return false;
            return true;
        };

        $scope.unset = function () {
            $scope.decision = {};
            $scope.decision.CreditRequestId = request.Id;
            $scope.decision.CreditRequestStatusInfo = "None";
            requestService.setStatus($scope.decision);
            $uibModalInstance.close();
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