define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.baseURI = 'http://localhost:12715/api/CreditRequest';
        this.authURI = 'http://localhost:12715/api/Account/';
        this.creditURI = 'http://localhost:12715/api/Credit';
        this.customerURI = 'http://localhost:12715/api/Customer';
    };
    module.service(name, dependencies.concat(resources));
});