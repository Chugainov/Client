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

                function _loadData() {
                    $scope._credits = [];
                    
                    $timeout(function () {
                        creditsService.get().then(function (response) {
                            $scope._credits = response.data;
                        });
                    });
                };

                $scope._delete = function (id) {
                    creditsService.delete(id).success(function () { _loadData(); });
                    
                };

                _loadData();

                $scope.animationsEnabled = true;

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
                        $timeout(function() { _loadData(); });
                        
                    }, function () {
                        //TODO:
                    });
                };

            };

        };

        module.directive(name, dependencies.concat(directive));
    });