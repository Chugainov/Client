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
                $scope._gridOptions = [];
                $scope._currentPage = 1;
                function _loadData(page) {
                    

                    $timeout(function () {
                        authService.getAll(page).then(function (response) {
                            $scope._gridOptions = response.data;
                        });
                    }, 1000);
                };

                $scope._delete = function (id) {
                    authService.delete(id).success(function () { _loadData($scope._currentPage); });

                };

                _loadData($scope._currentPage);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.confirm = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/auth/templates/confirm.html',
                        controller: 'Client.auth.confirmController',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $timeout(function () { _loadData($scope._currentPage); });

                    }, function () {
                        //TODO:
                    });
                };

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