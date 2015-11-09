define([
    '../module',
    '../namespace',
    '../../app'
], function (module, namespace, app) {
    var name = namespace + '.authService';
    
    var dependencies = ['$state', namespace + '.states'];

    var authService = function ($state, states) {
        var stateProvider = angular.module(app).stateProvider;
        var authServiceFactory = {};
        var _setUpMenu = function () {
            var routes = states.states;

            routes.forEach(function (route) {
                var name = route.name;
                stateProvider.state(routeName, state);
            });
        };

        authServiceFactory.setUpMenu = _setUpMenu;
        return authServiceFactory;
    };
    module.factory(name, dependencies.concat(authService));
})