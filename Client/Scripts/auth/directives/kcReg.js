define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcReg';
        var dependencies = [namespace + '.authService'];

        var directive = function (authService) {
            var directive = {
                templateUrl: 'Scripts/auth/templates/reg.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }



            function controller($scope, $uibModal, $timeout) {

                function _loadData(page) {
                    $scope._gridOptions = [];
                    $scope._currentPage = page;

                    $timeout(function () {
                        authService.getAll().then(function (response) {
                            $scope._gridOptions = response.data;
                        });
                    });
                };

                $scope._delete = function (id) {
                    authService.delete(id).success(function () { _loadData($scope._currentPage); });

                };

                _loadData(1);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.open = function () {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/auth/templates/popup.html',
                        controller: 'Client.auth.popupController'
                        }
                    );

                    modalInstance.result.then(function () {
                        $timeout(function () { _loadData($scope._currentPage); });

                    }, function () {
                        //TODO:
                    });
                };

            };

        };

        module.directive(name, dependencies.concat(directive));
    });