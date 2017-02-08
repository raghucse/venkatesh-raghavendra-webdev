/**
 * Created by raghu on 2/8/2017.
 */


(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("RegisterController", RegisterController);
    app.controller("LoginController", LoginController);
    app.controller("ProfileController", ProfileController);

    function RegisterController() {
        var vm = this;
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }

    function LoginController() {
        var vm = this;
    }


})();