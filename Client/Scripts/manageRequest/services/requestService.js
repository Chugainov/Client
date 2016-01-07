define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'requestService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        var authUri = settings.authURI;
        var creditUri = settings.creditURI;
        var customerUri = settings.customerURI;
        var requestServiceFactory = {};

        function _getAll() {
            var serviceUri = serviceBaseUri;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getUnconfirmed(page) {
            var serviceUri = serviceBaseUri + "/GetUnconfirmed";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, page, config);
        };

        function _getRole(data) {
            var serviceUri = authUri + "getrole";
            var data = {
                params: {
                    Token: data,
                    TokenObj: ''
                }
            };
            return $http.get(serviceUri, data);
        }

        function _getById(id) {
            return $http.get(serviceBaseUri + '/' + id);
        };

        function _getCredits() {
            var serviceUri = creditUri + "/GetAll";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getCustomer(num) {
            var serviceUri = customerUri;
            var data = {
                params: {
                    identificationNum: num
                }
            };
            return $http.get(serviceUri, data);
        };

        var _add = function (data) {
            var serviceUri = serviceBaseUri+"/add";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        var _delete = function (id) {
            return $http.delete(serviceBaseUri + '/' + id);
        };

        var _put = function (id, data) {
            var serviceUri = serviceBaseUri + "/" + id;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.put(serviceUri, data, config);
        }

        requestServiceFactory.getById = _getById;
        requestServiceFactory.getRole = _getRole;
        requestServiceFactory.getUnconfirmed = _getUnconfirmed;
        requestServiceFactory.add = _add;
        requestServiceFactory.delete = _delete;
        requestServiceFactory.getCredits = _getCredits;
        requestServiceFactory.put = _put;
        requestServiceFactory.getCustomer = _getCustomer;

        return requestServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})