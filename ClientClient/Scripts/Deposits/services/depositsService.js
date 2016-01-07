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

        depositsServiceFactory.getById = _getById;
        depositsServiceFactory.get = _get;
       
        return depositsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})