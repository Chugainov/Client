define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.states';
    var dependencies =[];

    var statesProvider = function () {
        var states = [
            { name: 'route1' },
            { name: 'route2' }
        ]
    };
    module.service(name, dependencies.concat(statesProvider));
});