define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcGiveCredits';
        var dependencies = [namespace + '.requestService'];

        var directive = function (requestService) {
            var directive = {
                templateUrl: 'Scripts/manageRequest/templates/gridGive.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }



            function controller($scope, $uibModal, $timeout) {
                $scope.status = 'Посмотреть невыданные кредиты';
                $scope.unconfirmed = true;
                function _loadData(page) {
                    $scope._gridOptions = [];
                    $scope._currentPage = page;
                    if ($scope.unconfirmed) {
                        $timeout(function () {
                            requestService.getConfirmedByChief($scope._currentPage).then(function (response) {
                                $scope._gridOptions = response.data;
                            });
                        });
                    };
                    if (!$scope.unconfirmed) {
                        $timeout(function () {
                            requestService.getCustomerCredits($scope._currentPage).then(function (response) {
                                $scope._gridOptions = response.data;
                            });
                        });
                    };
                };

                $scope.setStatus = function () {
                    if ($scope.unconfirmed) {
                        $scope.status = 'Посмотреть выданные кредиты';
                        $scope.unconfirmed = false;
                    } else {
                        $scope.status = 'Посмотреть невыданные кредиты';
                        $scope.unconfirmed = true;
                    }
                    _loadData(1);
                };

                _loadData(1);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.open = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/manageRequest/templates/popupGive.html',
                        controller: 'Client.manageRequest.popupGiveController',
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

            };

        };

        module.directive(name, dependencies.concat(directive));
    });