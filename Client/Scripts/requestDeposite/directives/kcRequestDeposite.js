﻿define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcRequestDeposite';
        var dependencies = [namespace + '.requestDepositeService'];

        var directive = function (requestDepositeService) {
            var directive = {
                templateUrl: 'Scripts/requestDeposite/templates/grid.html',
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
                    $scope.requestN = {};
                    $scope.customer = {};
                    $scope._gridOptions = [];
                    $scope._currentPage = page;
                        $timeout(function () {

                            
                            requestDepositeService.getCustomerDeposits($scope._currentPage).then(function (response) {
                                $scope._gridOptions = response.data;
                            });
                                   


                        });
                    
                };
                
                
                _loadData(1);
                
                $scope._delete = function (id) {
                    requestDepositeService.delete(id).success(function () { _loadData($scope._currentPage); });

                };
               

                $scope.openCalendar = function ($event) {
                    $scope.opened = true;
                };

                $scope.add = function () {
                    $scope.requestN.Customer = $scope.customer;
                    $scope.requestN.Customer.DocumentType = 0;
                    $scope.requestN.MilitaryId = $scope.military;
                    $scope.requestN.IncomeCertificate = $scope.docs;
                    $scope.requestN.Currency = 0;
                    $scope.requestN.CreditId = $scope.credit.Id;
                    requestService.add($scope.requestN);
                };

                $scope.pageChanged = function () {
                    _loadData($scope._currentPage);
                }

                $scope.animationsEnabled = true;

                $scope.open = function () {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/requestDeposite/templates/popup.html',
                        controller: 'Client.requestDeposite.popupController',
                       
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