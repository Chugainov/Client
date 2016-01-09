define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.baseURI = 'http://localhost:12715/api/CustomerCredit/';
        this.creditsURI = 'http://localhost:12715/api/Credit/';
    };
    module.service(name, dependencies.concat(resources));
});