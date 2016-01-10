define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'paymentsService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        var serviceDBaseUri = settings.baseDURI;
        var creditsBaseUri = settings.creditsURI;
        var paymentsServiceFactory = {};

        function _get(page) {
            var serviceUri = serviceBaseUri + "/Get";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getByContractNumberD(contractNumber) {
            var serviceUri = serviceDBaseUri + "GetByContractNumber";
            var data = {
                params: {
                    contractNumber: contractNumber
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getByCustomerD(page) {
            var serviceUri = serviceDBaseUri + "GetByCustomerId";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getByContractNumber(contractNumber) {
            var serviceUri = serviceBaseUri + "GetByContractNumber";
            var data = {
                params: {
                    contractNumber: contractNumber
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getByCustomer(page) {
            var serviceUri = serviceBaseUri + "GetByCustomerId";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getById(id) {
            return $http.get(serviceBaseUri + 'get/' + id);
        };

        paymentsServiceFactory.getByCustomer = _getByCustomer;
        paymentsServiceFactory.getByContractNumber = _getByContractNumber;
        paymentsServiceFactory.getByCustomerD = _getByCustomerD;
        paymentsServiceFactory.getByContractNumberD = _getByContractNumberD;


        return paymentsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})