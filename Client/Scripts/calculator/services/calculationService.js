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

        function _getById(id) {
            return $http.get(serviceBaseUri + 'get/' + id);
        };

        //var _post = function (data) {
        //    var serviceUri = serviceBaseUri + "post";
        //    var config = {
        //        headers: {
        //            'Accept': 'application/json'
        //        }
        //    };
        //    return $http.post(serviceUri, data, config);
        //};

        //var _delete = function (id) {
        //    return $http.delete(serviceBaseUri + 'delete/' + id);
        //};

        //var _put = function (id, data) {
        //    var serviceUri = serviceBaseUri + "put/" + id;
        //    var config = {
        //        headers: {
        //            'Accept': 'application/json'
        //        }
        //    };
        //    return $http.put(serviceUri, data, config);
        //}

        creditsServiceFactory.getById = _getById;
        creditsServiceFactory.get = _get;
        creditsServiceFactory.getMaxSum = _getMaxSum;
        //creditsServiceFactory.post = _post;
        //creditsServiceFactory.delete = _delete;
        //creditsServiceFactory.put = _put;

        return creditsServiceFactory;
    };

    module.factory(name, dependencies.concat(service));
})