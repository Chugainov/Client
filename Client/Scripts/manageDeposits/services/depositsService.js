define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'depositsService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        var depositsServiceFactory = {};

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

        depositsServiceFactory.getById = _getById;
        depositsServiceFactory.get = _get;
        depositsServiceFactory.post = _post;
        depositsServiceFactory.delete = _delete;
        depositsServiceFactory.put = _put;

        return depositsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})