define([
    '../namespace',
    '../module'
    
],
function (namespace, module) {
    'use strict';

    var factoryId = 'creditsService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        var creditsServiceFactory = {};

        function _getAll() {
            var serviceUri = serviceBaseUri;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _get(page) {
            var serviceUri = serviceBaseUri;
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getById(id) {
            return $http.get(serviceBaseUri + '/' + id);
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

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.get = _get;
        creditsServiceFactory.post = _post;
        creditsServiceFactory.delete = _delete;
        creditsServiceFactory.put = _put;

        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})