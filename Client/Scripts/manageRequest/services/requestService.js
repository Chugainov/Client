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
        var customerCreditUri = settings.customerCreditURI;
        var requestServiceFactory = {};

        function _getSolvencyRate(data) {
            var serviceUri = "http://localhost:12715/api/calculationcredit/solvencyrate";
            var data = {
                params: {
                    Sum: data.Sum,
                    MonthPeriod: data.MonthCount,
                    CreditId: data.CreditId,
                    IncomeSum: data.IncomeSum,
                    OtherCreditPayments: data.OtherCreditPayments,
                    UtilitiesPayments: data.UtilitiesPayments,
                    OtherPayments: data.OtherPayments
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getAll() {
            var serviceUri = serviceBaseUri;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getConfirmed(page) {
            var serviceUri = serviceBaseUri + "/GetConfirmed";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, page, config);
        };

        function _getConfirmedByChief(page) {
            var serviceUri = serviceBaseUri + "/GetConfirmedByChief";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, page, config);
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

        function _getUnconfirmedByChief(page) {
            var serviceUri = serviceBaseUri + "/GetUnconfirmedByChief";
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

        function _getByCustomer(customerId, page) {
            var serviceUri = customerCreditUri + "/GetByCustomerId";
            var data = {
                params: {
                    customerId: customerId,
                    page: page
                }
            };
            return $http.get(serviceUri, data);
        };

        function _getCustomerCredits(page) {
            var serviceUri = customerCreditUri + "/Get";
            var data = {
                params: {
                    page: page
                }
            };
            return $http.get(serviceUri, data);
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
            var serviceUri = serviceBaseUri + "/add";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        var _giveCredit = function (data) {
            var serviceUri = customerCreditUri + "/add";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        var _setStatus = function (data) {
            var serviceUri = serviceBaseUri + "/SetStatus";
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


        requestServiceFactory.getByCustomer = _getByCustomer;
        requestServiceFactory.getRole = _getRole;
        requestServiceFactory.getConfirmed = _getConfirmed;
        requestServiceFactory.getConfirmedByChief = _getConfirmedByChief;
        requestServiceFactory.getUnconfirmed = _getUnconfirmed;
        requestServiceFactory.getUnconfirmedByChief = _getUnconfirmedByChief;
        requestServiceFactory.add = _add;
        requestServiceFactory.setStatus = _setStatus;
        requestServiceFactory.delete = _delete;
        requestServiceFactory.giveCredit = _giveCredit;
        requestServiceFactory.getCredits = _getCredits;
        requestServiceFactory.getCustomerCredits = _getCustomerCredits;
        requestServiceFactory.getCustomer = _getCustomer; 
        requestServiceFactory.getSolvencyRate = _getSolvencyRate; 
        

        return requestServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})