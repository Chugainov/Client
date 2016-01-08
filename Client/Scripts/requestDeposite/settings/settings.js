define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.depositeURI = 'http://localhost:12715/api/Deposit';
        this.customerURI = 'http://localhost:12715/api/Customer';
        this.baseURI = 'http://localhost:12715/api/CustomerDeposit';
    };
    module.service(name, dependencies.concat(resources));
});