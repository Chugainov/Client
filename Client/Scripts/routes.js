define(['./namespace', 'angular', './app'], function (namespace, angular) {
    'use strict';
    var app = angular.module(namespace);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
        .state('home', {
            url: "/home",
            //template:'<h1>asdf</h1>'
            templateUrl: "Scripts/common/templates/_mainLayout.html",
        })
          
        .state('route2', {
            url: "/route2",
            templateUrl: "Scripts/common/templates/_empty.html"
        })
    }]);
});