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
        var creditsBaseUri = settings.creditsURI;
        var paymentsServiceFactory = {};

        function _get() {
            var serviceUri = creditsBaseUri;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };



        function _getPaymentPlan(data) {
            var serviceUri = serviceBaseUri + 'paymentsplan';
            var data = {
                params: {
                    creditId: data.CreditId,
                    sum: data.Sum,
                    monthCount: data.Month,
                    startDate: new Date()
                }
            };
            return $http.get(serviceUri, data);
        }

        function _getById(id) {
            return $http.get(serviceBaseUri + 'get/' + id);
        };

        paymentsServiceFactory.get = _get;
        paymentsServiceFactory.getPaymentPlan = _getPaymentPlan;


        return paymentsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})