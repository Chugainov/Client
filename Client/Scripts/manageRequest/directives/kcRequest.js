﻿define([
    '../module'
    , '../namespace'
],
    function (module, namespace) {
        var name = 'kcRequest';
        var dependencies = [namespace + '.requestService', 'localStorageService'];

        var directive = function (requestService, localStorageService) {
            var directive = {
                templateUrl: 'Scripts/manageRequest/templates/grid.html',
                link: link,
                restrict: 'EA',
                controller: controller
            }
            return directive;

            function link(scope, el, attrs) {
                var temp = scope;
            }

            

            function controller($scope, $uibModal, $timeout) {
                $scope.status = 'Посмотреть обработанные';
                $scope.unconfirmed = true;
                function _loadData(page) {
                    $scope.requestN = {};
                    $scope.customer = {};
                    $scope._gridOptions = [];
                    $scope._currentPage = page;
                    if ($scope.unconfirmed) {
                        $timeout(function () {
                            
                            switch ($scope.Role) {
                                case 1:
                                    requestService.getCredits().then(function (response) {
                                        $scope._credits = response.data;
                                    });
                                    break;
                                case 3:
                                    requestService.getUnconfirmed($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                                case 4:
                                    requestService.getUnconfirmed($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                                case 5:
                                    requestService.getUnconfirmedByChief($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                            }

                        });
                    };
                    if (!$scope.unconfirmed) {
                        $timeout(function () {
                            
                            switch ($scope.Role) {
                                case 1:
                                    requestService.getCredits().then(function (response) {
                                        $scope._credits = response.data;
                                    });
                                    break;
                                case 3:
                                    requestService.getConfirmed($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                                case 4:
                                    requestService.getConfirmed($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                                case 5:
                                    requestService.getConfirmedByChief($scope._currentPage).then(function (response) {
                                        $scope._gridOptions = response.data;
                                    });
                                    break;
                            }

                        });
                    }
                };
                $scope.setStatus = function () {
                    if ($scope.unconfirmed) {
                        $scope.status = 'Посмотреть необработанные';
                        $scope.unconfirmed = false;
                    } else {
                        $scope.status = 'Посмотреть обработанные';
                        $scope.unconfirmed = true;
                    }
                    _loadData(1);
                };
                $scope.Set = function () {
                    requestService.getCustomer($scope.customer.IdentificationNumber).then(function (responce) {
                        $scope.customer = responce.data;
                    })
                };

                $scope.loadMilitary = function (e) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            $scope.$apply(function () {
                                $scope.military = loadEvent.target.result.substring(23);
                            });
                        }
                        reader.readAsDataURL(e.files[0]);
                        
                   
                };

                $scope.loadDocs = function (e) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        $scope.$apply(function () {
                            $scope.docs = loadEvent.target.result.substring(23);
                        });
                    }
                    reader.readAsDataURL(e.files[0]);
                    

                };
                $scope._delete = function (id) {
                    requestService.delete(id).success(function () { _loadData($scope._currentPage); });
                    
                };
                var token = localStorageService.get('token');
                requestService.getRole(token).then(function (response) {
                    switch (response.data.Role) {
                        case 'CreditCommitteeMember':
                            $scope.Role = 4;
                            break;
                        case 'CreditDepartmentChief':
                            $scope.Role = 5;
                            break;
                        case 'Operator':
                            $scope.Role = 1;
                            break;
                        case 'Security':
                            $scope.Role = 3;
                            
                            break;
                    };
                    _loadData(1);
                });

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

                $scope.open = function (request) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'scripts/manageRequest/templates/popup.html',
                        controller: 'Client.manageRequest.popupController',
                        resolve: {
                            request: function () {
                                return request;
                            },
                            role: function () {
                                return $scope.Role;
                            },
                            unconfirmed: function () {
                                return $scope.unconfirmed;
                            },
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