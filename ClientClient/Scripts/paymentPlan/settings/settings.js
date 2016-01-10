define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.baseURI = 'http://localhost:21953/api/CustomerCredit/';
        this.baseDURI = 'http://localhost:21953/api/CustomerDeposit/';
        this.creditsURI = 'http://localhost:21953/api/Credit/';
    };
    module.service(name, dependencies.concat(resources));
});