define([
     'angular',
     './namespace',
     './common/namespace',
     'angularUiRouter',
     'angularUiBootstrap',
     'angularPermission',
     './common/require',
     './manageCredits/namespace',
     './manageCredits/require'
], function (angular, namespace, common ) {
    'use strict';

    var name = namespace;

    return angular.module(name, [common, 'ui.router', 'permission', 'ui.bootstrap', 'Client.manageCredits']);
});