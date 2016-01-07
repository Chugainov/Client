define(['./namespace','./auth/services/authService', 'angular', './app'], function (namespace, auth, angular) {
    'use strict';
    var app = angular.module(namespace);
    var roles = {
        Admin: 0,
        Operator: 1,
        User: 2,
        Security: 3,
        CreditCommitteeMember: 4,
        CreditDepartmentChief: 5,
        Cashier: 6
    };

    var routeForUnauthorizedAccess = '/authorization';
    app.run(function($rootScope) {
        $rootScope.$on('$stateChangeError', function() {
            console.error(arguments[5]);
        });
    });

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
        .state('home', {
            url: "/home",
            
            templateUrl: "Scripts/common/templates/_mainLayout.html"
        })

        .state('credits', {
            url: "/credits",
            templateUrl: "Scripts/common/templates/_credits.html",
           
        })

        .state('deposits', {
            url: "/deposits",
            templateUrl: "Scripts/common/templates/_deposits.html"
        })

        .state('plan', {
            url: "/payments",
            resolve: {
                permissionResource: "authorizationService",
                permission: function (permissionResource, $stateParams) {
                    return permissionResource.permissionCheck([roles.Admin, roles.User]);
                }
            },
            templateUrl: "Scripts/common/templates/_payments.html"
        })

        .state('calculation', {
            url: "/calculation",
            templateUrl: "Scripts/common/templates/_calculator.html"
        })

        .state('auth', {
            url: "/authorization",
            templateUrl: "Scripts/common/templates/_auth.html",
            controller: "Client.auth.authController"
        })

        .state('reg', {
            url: "/registration",
            templateUrl: "Scripts/common/templates/_reg.html",
            controller: "Client.auth.regController"
        })
    }]);

    app.factory('authorizationService',['Client.auth.authService','$resource', '$q', '$rootScope', '$location', 'localStorageService',
    function (auth, $resource, $q, $rootScope, $location, localStorageService) {
        return {
            // We would cache the permission for the session,
            //to avoid roundtrip to server
            //for subsequent requests

            permissionModel: {
                permission: {},
                isPermissionLoaded: false
            },

            permissionCheck: function (roleCollection) {

                // we will return a promise .
                var deferred = $q.defer();

                //this is just to keep a pointer to parent scope from within promise scope.
                var parentPointer = this;
                this.permissionModel.isPermissionLoaded = false;
                //Checking if permission object(list of roles for logged in user) 
                //is already filled from service
                if (this.permissionModel.isPermissionLoaded) {
                    //Check if the current user has required role to access the route
                    this.getPermission(this.permissionModel, roleCollection, deferred);
                } else {
                    //if permission is not obtained yet, we will get it from  server.
                    // 'api/permissionService' is the path of server web service , used for this example.
                    var token = localStorageService.get('token');
                    auth.getRole(token).then(function (response) {
                        //when server service responds then we will fill the permission object
                        parentPointer.permissionModel.permission = response.data.Role;

                        //Indicator is set to true that permission object is filled and 
                        //can be re-used for subsequent route request for the session of the user
                        parentPointer.permissionModel.isPermissionLoaded = true;

                        //Check if the current user has required role to access the route
                        parentPointer.getPermission(parentPointer.permissionModel, roleCollection, deferred);
                    });
                }
                return deferred.promise;
            },

            //Method to check if the current user has required role to access the route
            //'permissionModel' has permission information obtained from server for current user
            //'roleCollection' is the list of roles which are authorized to access route
            //'deferred' is the object through which we shall resolve promise
            getPermission: function (permissionModel, roleCollection, deferred) {
                var ifPermissionPassed = false;
               
                angular.forEach(roleCollection, function (role) {
                    switch (role) {
                        case roles.Admin:
                            if (permissionModel.permission == "Admin") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.Operator:
                            if (permissionModel.permission == "Operator") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.User:
                            if (permissionModel.permission == "User") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.Security:
                            if (permissionModel.permission == "Security") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.CreditCommitteeMember:
                            if (permissionModel.permission == "CreditCommitteeMember") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.CreditDepartmentChief:
                            if (permissionModel.permission == "CreditDepartmentChief") {
                                ifPermissionPassed = true;
                            }
                            break;
                        case roles.Cashier:
                            if (permissionModel.permission == "Cashier") {
                                ifPermissionPassed = true;
                            }
                            break;
                        default:
                            ifPermissionPassed = false;
                    }
                });
                if (!ifPermissionPassed) {
                    //If user does not have required access, 
                    //we will route the user to unauthorized access page
                    $location.path(routeForUnauthorizedAccess);
                    //As there could be some delay when location change event happens, 
                    //we will keep a watch on $locationChangeSuccess event
                    // and would resolve promise when this event occurs.
                    $rootScope.$on('$locationChangeSuccess', function (next, current) {
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
            }
        };
    }]);
});