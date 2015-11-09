require.config({

    paths: {
        'angular': '../libs/angular/angular',
        'jquery': '../libs/jquery/dist/jquery',
        'angularUiRouter': '../libs/angular-ui-router/release/angular-ui-router',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',
        'underscoreModule': '../libs/underscore/underscore',
        'angularPermission': '../libs/angular-permission/dist/angular-permission'
        
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