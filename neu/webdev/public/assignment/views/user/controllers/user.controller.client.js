/**
 * Created by raghu on 2/8/2017.
 */


(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("LoginController", LoginController);
    app.controller("ProfileController", ProfileController);
    app.controller("RegisterController", RegisterController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.update =  update;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function update() {
            vm.user = UserService.updateUser(vm.userId, vm.user);
            if(vm.user == null){
                vm.error = "Unable to update user";
            }{
                vm.message = "User successfully updates";
            }
        }

    }

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user != null) {
                $location.url('/user/' + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register() {
            vm.user._id = (new Date()).getTime();
            UserService.createUser(vm.user);
            $location.url('/user/' + vm.user._id);
        }
    }
})();