define([
     'angular',
     './namespace',
     './common/namespace',
     'angularUiRouter',
     'angularPermission',
     './common/require'
], function (angular, namespace, common ) {
    'use strict';

    var name = namespace;

    return angular.module(name, [common,'ui.router', 'permission']);
});