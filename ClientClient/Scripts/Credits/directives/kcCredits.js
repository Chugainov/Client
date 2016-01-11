define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcCredits';
        var dependencies = [namespace + '.creditsService'];

        var directive = function (creditsService) {
            var directive = {
                templateUrl: 'Scripts/Credits/templates/grid.html',
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
                    $scope._currentPage = page;
                    
                    $timeout(function () {
                        creditsService.get($scope._currentPage).then(function (response) {
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
                        templateUrl: 'scripts/Credits/templates/popup.html',
                        controller: 'Client.Credits.popupController',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $timeout(function() { _loadData(); });
                        
                    }, function () {
                        //TODO:
                    });
                };

            };

        };

        module.directive(name, dependencies.concat(directive));
    });