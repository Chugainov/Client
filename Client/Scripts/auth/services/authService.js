define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'authService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        var authServiceFactory = {};

        var _register = function (data) {
            var serviceUri = serviceBaseUri + "register";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        function _getAll(page) {
            var serviceUri = serviceBaseUri + "GetAll";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        }

        function _getRole(data) {
            var serviceUri = serviceBaseUri + "getrole";
            var data = {
                params: {
                    Token: data,
                    TokenObj: ''
                }
            };
            return $http.get(serviceUri,data);
        }

        function _login(data) {
            var serviceUri = serviceBaseUri + "login";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        function _logout(data) {
            var serviceUri = serviceBaseUri + "logout";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        var _post = function (data) {
            var serviceUri = serviceBaseUri;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };
        
        authServiceFactory.login = _login;
        authServiceFactory.getRole = _getRole;
        authServiceFactory.logout = _logout;
        authServiceFactory.getAll = _getAll;
        authServiceFactory.register = _register;
        return authServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})