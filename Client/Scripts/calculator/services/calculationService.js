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
        var calculationCreditBaseUri = settings.calculationCreditURI;
        var calculationDepositBaseUri = settings.calculationDepositURI;
        var creditsBaseUri = settings.creditsURI;
        var depositsBaseUri = settings.depositsURI;
        var creditsServiceFactory = {};

        function _getCredits() {
            var serviceUri = creditsBaseUri + "GetAll";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        }; 

        function _getCapitalizationPlan(data) {
            var serviceUri = calculationDepositBaseUri + 'capitalizationplan';
            var data = {
                Sum: data.Sum,
                PercentRate: data.PercentRate,
                MonthCount: data.MonthCount,
                startDate: new Date(),
                DepositId: data.DepositId
            };
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        }

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
            var serviceUri = calculationCreditBaseUri + "maxsum";
            var data = {
                creditId: data.CreditId,
                monthCount: data.Month,
                incomeSum: data.IncomeSum,
                otherCreditPayments: data.OtherCreditSum,
                utilitiesPayments: data.UtilSum,
                otherPayments: data.OtherSum
            };
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        function _getIncomeReq(data) {
            var serviceUri = calculationCreditBaseUri + "income";
            var data = {
                creditId: data.CreditId,
                sum: data.Sum,
                monthCount: data.Month,
                otherCreditPayments: data.OtherCreditSum,
                utilitiesPayments: data.UtilSum,
                otherPayments: data.OtherSum
            };
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };

        function _getPaymentPlan(data) {
            var serviceUri = calculationCreditBaseUri + 'paymentsplan';
            var data = {
                creditId: data.CreditId,
                sum: data.Sum,
                monthCount: data.Month,
                startDate: new Date()
            };
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        }

        function _getById(id) {
            return $http.get(calculationCreditBaseUri + 'get/' + id);
        };

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.getIncomeReq = _getIncomeReq;
        creditsServiceFactory.getCredits = _getCredits;
        creditsServiceFactory.getDeposits = _getDeposits;
        creditsServiceFactory.getMaxSum = _getMaxSum;
        creditsServiceFactory.getCapitalizationPlan = _getCapitalizationPlan;
        creditsServiceFactory.getPaymentPlan = _getPaymentPlan; 


        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})