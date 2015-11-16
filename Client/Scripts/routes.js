define(['./namespace', 'angular', './app'], function (namespace, angular) {
    'use strict';
    var app = angular.module(namespace);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "Scripts/common/templates/_mainLayout.html",
        })

        .state('credits', {
            url: "/credits",
            templateUrl: "Scripts/common/templates/_empty.html"
        })
    }]);
});