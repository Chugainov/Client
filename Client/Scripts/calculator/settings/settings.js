define([
    '../module',
    '../namespace'
], function (module, namespace) {
    var name = namespace + '.settings';
    var dependencies = [];

    var resources = function () {
        this.calculationCreditURI = 'http://localhost:12715/api/CalculationCredit/';
        this.calculationDepositURI = 'http://localhost:12715/api/CalculationDeposit/';
        this.creditsURI = 'http://localhost:12715/api/Credit/';
        this.depositsURI = 'http://localhost:12715/api/Deposit/';
    };
    module.service(name, dependencies.concat(resources));
});