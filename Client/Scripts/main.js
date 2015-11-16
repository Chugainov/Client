require.config({

    paths: {
        'angular': '../libs/angular/angular',
        'jquery': '../libs/jquery/dist/jquery',
        'angularUiRouter': '../libs/angular-ui-router/release/angular-ui-router',
        'angularUiBootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'underscoreModule': '../libs/underscore/underscore',
        'angularPermission': '../libs/angular-permission/dist/angular-permission',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute': {
            deps: [
                'angular',
                'jquery'
            ]
        },
        'underscoreModule': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angularUiBootstrap': {
            deps: [
                'angular',
                'bootstrap'
            ]
        },
        'angularUiRouter': {
            deps: [
                'angular',
                'jquery'
            ]
        },
        'angularPermission': {
            deps: [
                'angular',
                'jquery'
            ]
        }
    },

});

define([
     'require',
     'angular',
     './namespace',
     './routes'
], function (require, angular, namespace) {
    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, [namespace]);
    });
});