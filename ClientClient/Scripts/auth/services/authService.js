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

        function _changePass(data) {
            var serviceUri = serviceBaseUri + "ChangePassword";

            return $http.post(serviceUri, data);
        }

        function _changeEmail(data) {
            var serviceUri = serviceBaseUri + "ChangeEmail";

            return $http.post(serviceUri, data);
        }

        function _logout(data) {
            var serviceUri = serviceBaseUri + "logout";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        var _register = function (data) {
            var serviceUri = serviceBaseUri + "register";
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
        authServiceFactory.register = _register; 
        authServiceFactory.changePass = _changePass;
        authServiceFactory.changeEmail = _changeEmail;
        return authServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})