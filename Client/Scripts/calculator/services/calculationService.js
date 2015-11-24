﻿define([
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
        var creditsBaseUri = settings.creditsURI;
        var creditsServiceFactory = {};

        function _get() {
            var serviceUri = creditsBaseUri + "get";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getMaxSum(data) {
            var serviceUri = serviceBaseUri + "/maxsum?creditid=" + data.CreditId + "&monthperiod=" + data.Month +
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
            var serviceUri = serviceBaseUri + "/income?creditid=" + data.CreditId + "&monthperiod=" + data.Month +
                "&sum=" + data.Sum + "&othercreditpayments=" + data.OtherCreditSum +
                "&utilitiespayments=" + data.UtilSum + "&otherpayments=" + data.UtilSum;
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.get(serviceUri, config);
        };

        function _getById(id) {
            return $http.get(serviceBaseUri + 'get/' + id);
        };

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.getIncomeReq = _getIncomeReq;
        creditsServiceFactory.get = _get;
        creditsServiceFactory.getMaxSum = _getMaxSum;


        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})