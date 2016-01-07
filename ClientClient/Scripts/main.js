﻿require.config({

    paths: {
        'angular': '../libs/angular/angular',
        'jquery': '../libs/jquery/dist/jquery',
        'angularUiRouter': '../libs/angular-ui-router/release/angular-ui-router',
        'angularLocalStorage': '../libs/angular-local-storage/dist/angular-local-storage',
        'angularUiBootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'underscoreModule': '../libs/underscore/underscore',
        'angularResource': '../libs/angular-resource/angular-resource',
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
        'angularResource': {
            deps: [
                'angular',
                'jquery'
            ]
        },
        'angularLocalStorage': {
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