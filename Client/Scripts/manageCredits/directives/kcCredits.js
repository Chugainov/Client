define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcCredits';
        var dependencies = [namespace + '.creditsService'];

        var directive = function (creditsService) {
            var directive = {
                templateUrl: 'Scripts/manageCredits/templates/grid.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }

            

            function controller($scope, $uibModal, $timeout) {

                $scope._currentPage = 1;
                function _loadData(page) {
                    
                    $timeout(function () {
                        creditsService.get($scope._currentPage).then(function (response) {
                            $scope._gridOptions = response.data;
                        });
                    }, 1000);
                };

                

                _loadData($scope._currentPage);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.confirm = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/manageCredits/templates/confirm.html',
                        controller: 'Client.manageCredits.confirmController',
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

                $scope.open = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/manageCredits/templates/popup.html',
                        controller: 'Client.manageCredits.popupController',
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