define([
    '../module',
    '../namespace'
], function (module, namespace, app) {
    var name = namespace + '.menuController';

    var dependencies = [namespace + '.authService', '$scope', 'localStorageService'];

    var controller = function (authService, $scope, localStorageService) {
        var token = localStorageService.get('token');
        var load = function () {
            authService.getRole().then(function (response) {
                var Role = response.data.Role;
                if (typeof (Role) == "undefined") {
                    $scope.showLogin = true;

                }
                else {
                    $scope.showLogin = false;

                };

            });
        }
        $scope.logout = function () {
            var user = { UserName: $scope.Name, Password: $scope.Password };
            var token = localStorageService.get('token');
            var data = { Token: token, TokenObj: '' };
            authService.logout(data).then(function (response) {

                localStorageService.remove('token');
            });
            load();
        }
        
    };
    module.controller(name, dependencies.concat(controller));
})