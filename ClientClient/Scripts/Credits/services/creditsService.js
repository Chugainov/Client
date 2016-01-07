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

       

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.get = _get;

        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})