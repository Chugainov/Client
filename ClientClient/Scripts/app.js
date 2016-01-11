define([
     'angular',
     './namespace',
     './common/namespace',
     'angularUiRouter',
     'angularLocalStorage',
     'angularUiBootstrap',
     'angularResource',
     'angularLocale',
     './common/require',
     './Credits/namespace',
     './Credits/require',
     './Deposits/namespace',
     './Deposits/require',
     './calculator/namespace',
     './calculator/require',
     './auth/namespace',
     './auth/require',
     './paymentPlan/namespace',
     './paymentPlan/require'
], function (angular, namespace, common ) {
    'use strict';

    var name = namespace;

    return angular.module(name, [common, 'ui.router','LocalStorageModule', 'ngResource', 'ui.bootstrap','Client.Deposits',
                                 'Client.Credits', 'Client.calculator', 'Client.auth', 'Client.payments']);
});