define([
    '../module',
    '../namespace',
], function (module, namespace, app) {
    var name = namespace + '.popupController';

    var dependencies = ['$uibModalInstance', '$scope', namespace + '.authService'];

    var controller = function ($uibModalInstance, $scope, authService) {
        

        $scope.roles = [
            { Display: "Admin", Id: 0 },
            { Display: "Operator", Id: 1 },
            { Display: "Security", Id: 3 },
            { Display: "CreditCommitteeMember", Id: 4 },
            { Display: "CreditDepartmentChief", Id: 5 },
            { Display: "Cashier", Id: 6 },
        ];

        $scope.isValid = function () {
            if (typeof ($scope.info) == 'undefined') return false;
            if (typeof ($scope.info.Password) == 'undefined') return false;
            if ($scope.info.Password != $scope.info.ConfirmPassword) return false;
            return true;
        };

        $scope.ok = function () {
            $scope.info.Role = $scope.role ? $scope.role.Id : undefined;
            authService.register($scope.info).then(function () {
                $uibModalInstance.close();
            }, function (error) {
                $scope.errors = error.data.ModelState;
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };
    module.controller(name, dependencies.concat(controller));
})