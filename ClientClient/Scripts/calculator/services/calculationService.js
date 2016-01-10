define([
    '../namespace',
    '../module'

],
function (namespace, module) {
    'use strict';

    var factoryId = 'calculatorService';
    var name = namespace + "." + factoryId;
    var dependencies = ['$http', namespace + '.settings'];
    var service = function ($http, settings) {
        var serviceBaseUri = settings.calculationCreditURI;
        var serviceBaseDepositUri = settings.calculationDepositURI;
        var creditsBaseUri = settings.creditsURI;
        var depositsBaseUri = settings.depositsURI;
        var creditsServiceFactory = {};

        function _getCapitalizationPlan(data) {
            var serviceUri = serviceBaseDepositUri + 'capitalizationplan';
            var data = {
                params: {
                    Sum: data.Sum,
                    PercentRate: data.PercentRate,
                    MonthPeriod: data.Month,
                    startDate: new Date()
                }
            };
            return $http.get(serviceUri, data);
        }

        function _getCredits() {
            var serviceUri = creditsBaseUri + "GetAll";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getDeposits() {
            var serviceUri = depositsBaseUri + "GetAll";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getMaxSum(data) {
            var serviceUri = serviceBaseUri + "/maxsum?creditid=" + data.CreditId + "&monthcount=" + data.Month +
                "&incomesum=" + data.IncomeSum + "&othercreditpayments=" + data.OtherCreditSum +
                "&utilitiespayments="+data.UtilSum+"&otherpayments="+ data.UtilSum;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getIncomeReq(data) {
            var serviceUri = serviceBaseUri + "/income?creditid=" + data.CreditId + "&monthcount=" + data.Month +
                "&sum=" + data.Sum + "&othercreditpayments=" + data.OtherCreditSum +
                "&utilitiespayments=" + data.UtilSum + "&otherpayments=" + data.UtilSum;
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

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.getIncomeReq = _getIncomeReq;
        creditsServiceFactory.getCredits = _getCredits;
        creditsServiceFactory.getDeposits = _getDeposits;
        creditsServiceFactory.getCapitalizationPlan = _getCapitalizationPlan;
        creditsServiceFactory.getMaxSum = _getMaxSum; 
        creditsServiceFactory.getPaymentPlan = _getPaymentPlan;


        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})