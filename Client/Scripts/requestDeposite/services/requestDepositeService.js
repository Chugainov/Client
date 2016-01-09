define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'requestDepositeService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.baseURI;
        
        var depositUri = settings.depositeURI;
        var customerUri = settings.customerURI;
        var requestDepositeServiceFactory = {};

        function _getContract(id) {
            var serviceUri = serviceBaseUri + "/GetContract";
            var data = {
                params: {
                    contractNumber: id
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getByCustomer(customerId, page) {
            var serviceUri = serviceBaseUri + "/GetByCustomerId";
            var data = {
                params: {
                    customerId: customerId,
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getCustomerDeposits(page) {
            var serviceUri = serviceBaseUri + "/Get";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getDeposits() {
            var serviceUri = depositUri + "/GetAll";
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
            var serviceUri = serviceBaseUri + "/add";
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


        requestDepositeServiceFactory.getByCustomer = _getByCustomer;
       
        requestDepositeServiceFactory.add = _add;
        requestDepositeServiceFactory.delete = _delete;
        requestDepositeServiceFactory.getDeposits = _getDeposits;
        requestDepositeServiceFactory.getCustomerDeposits = _getCustomerDeposits;
        requestDepositeServiceFactory.getCustomer = _getCustomer;

        return requestDepositeServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})