define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.calculationCreditURI = 'http://localhost:21953/api/CalculationCredit/';
        this.calculationDepositURI = 'http://localhost:21953/api/CalculationDeposit/';
        this.creditsURI = 'http://localhost:21953/api/Credit/';
        this.depositsURI = 'http://localhost:21953/api/Deposit/';
    };
    module.service(name, dependencies.concat(resources));
});