define([
    '../module',
    '../namespace',
    '../../app'
], function (module, namespace, app) {
    var name = namespace + '.payService';
    
    var dependencies = ['$http'];

    var authService = function ($http) {
        
        var payServiceFactory = {};
        
        var _pay = function (data) {
            var serviceUri = "http://localhost:12715/api/Payment/" + "add";
            var config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
            return $http.post(serviceUri, data, config);
        };
        payServiceFactory.pay = _pay;
        return payServiceFactory;
    };
    module.factory(name, dependencies.concat(authService));
})