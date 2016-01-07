define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.baseURI = 'http://localhost:21953/api/credit';
    };
    module.service(name, dependencies.concat(resources));
});