﻿define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcDeposits';
        var dependencies = [namespace + '.depositsService'];

        var directive = function (depositsService) {
            var directive = {
                templateUrl: 'Scripts/manageDeposits/templates/grid.html',
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
                        depositsService.get().then(function (response) {
                            $scope._gridOptions = response.data;
                        });
                    }, 1000);
                };

                $scope._delete = function (id) {
                    depositsService.delete(id).success(function () { _loadData($scope._currentPage); });

                };

                _loadData(1);

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.open = function (id) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/manageDeposits/templates/popup.html',
                        controller: 'Client.manageDeposits.popupController',
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