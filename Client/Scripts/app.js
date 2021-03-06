﻿define([
     'angular',
     './namespace',
     './common/namespace',
     'angularUiRouter',
     'angularLocalStorage',
     'angularUiBootstrap',
     'angularResource',
     'angularLocale',
     './common/require',
     './manageCredits/namespace',
     './manageCredits/require',
     './manageDeposits/namespace',
     './manageDeposits/require',
     './calculator/namespace',
     './calculator/require',
     './auth/namespace',
     './auth/require',
     './manageRequest/namespace',
     './manageRequest/require',
     './paymentPlan/namespace',
     './paymentPlan/require',
     './requestDeposite/namespace',
     './requestDeposite/require'
], function (angular, namespace, common ) {
    'use strict';

    var name = namespace;

    return angular.module(name, [common, 'ui.router', 'LocalStorageModule', 'ngResource', 'ui.bootstrap', 'Client.manageDeposits',
                                 'Client.manageCredits', 'Client.calculator', 'Client.auth', 'Client.manageRequest','Client.payments', 'Client.requestDeposite']);
});