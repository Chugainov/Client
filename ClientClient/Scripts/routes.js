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

        .state('creditHistory', {
            url: "/paymentsCredit",
            resolve: {
                permissionResource: "authorizationService",
                permission: function (permissionResource, $stateParams) {
                    return permissionResource.permissionCheck();
                }
            },
            templateUrl: "Scripts/common/templates/_payments.html"
        })

        .state('depositHistory', {
            url: "/paymentsDeposit",
            resolve: {
                permissionResource: "authorizationService",
                permission: function (permissionResource, $stateParams) {
                    return permissionResource.permissionCheck();
                }
            },
            templateUrl: "Scripts/common/templates/_paymentsD.html"
        })

        .state('calculationD', {
            url: "/calculationD",
            
            templateUrl: "Scripts/common/templates/_calculatorD.html"
        })

        .state('calculationC', {
            url: "/calculationC",
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

    app.factory('authorizationService',['$resource', '$q', '$rootScope', '$location', 'localStorageService',
    function ($resource, $q, $rootScope, $location, localStorageService) {
        return {
            // We would cache the permission for the session,
            //to avoid roundtrip to server
            //for subsequent requests


            permissionCheck: function () {

                // we will return a promise .
                var deferred = $q.defer();

                if ($rootScope.isLogin) {
                    deferred.resolve();
                } else {
                    $location.path(routeForUnauthorizedAccess);
                    $rootScope.$on('$locationChangeSuccess', function (next, current) {
                        deferred.resolve();
                    });
                }
                
                
                return deferred.promise;
            },

           
        };
    }]);
});