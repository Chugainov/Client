define([
    '../module',
    '../../app',
    '../namespace'
], function (module, app, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    

    var resources = function () {
        this.baseURI = 'http://localhost:21953/api/Account/';


    };
    module.service(name, dependencies.concat(resources));

    module.factory('sessionInjector', ['localStorageService', function (localStorageService) {
        var sessionInjector = {
            request: function (config) {
                var token = localStorageService.get('token');
                config.headers['token'] = token;
                return config;
            }
        };
        return sessionInjector;
    }]);
    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');
    }]);
});

