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
        var timeUri = settings.timeURI;
        var authServiceFactory = {};

        function _getTime() {
            var serviceUri = timeUri + "Get";

            return $http.get(serviceUri);
        }

        var _register = function (data) {
            var serviceUri = serviceBaseUri + "register";
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
            return $http.get(serviceUri, data);
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

        var _delete = function (id) {
            var data = {
                params: {
                    id: id
                }
            };
            return $http.delete(serviceBaseUri + "/delete", data);
        };

        authServiceFactory.login = _login;
        authServiceFactory.getRole = _getRole;
        authServiceFactory.logout = _logout;
        authServiceFactory.changePass = _changePass;
        authServiceFactory.getAll = _getAll;
        authServiceFactory.getTime = _getTime;
        authServiceFactory.register = _register;
        authServiceFactory.delete = _delete;
        return authServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})