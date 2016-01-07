define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcDeposits';
        var dependencies = [namespace + '.depositsService'];

        var directive = function (depositsService) {
            var directive = {
                templateUrl: 'Scripts/Deposits/templates/grid.html',
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
                        depositsService.get($scope._currentPage).then(function (response) {
                            $scope._gridOptions = response.data;
                        });
                    });
                };

                _loadData(1);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.open = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/Deposits/templates/popup.html',
                        controller: 'Client.Deposits.popupController',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $timeout(function () { _loadData(); });

                    }, function () {
                        //TODO:
                    });
                };

            };

        };

        module.directive(name, dependencies.concat(directive));
    });