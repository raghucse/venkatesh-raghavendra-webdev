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
            var promise = UserService.findUserById(vm.userId);
            promise.then(function(user){
                vm.user = user.data;
            });
        }
        init();

        function update() {
            vm.user = UserService.updateUser(vm.userId, vm.user);
            if(vm.user == null){
                vm.error = "Unable to update user";
            }{
                vm.message = "User successfully updated";
            }
        }

    }

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password);
            promise.then(function(user){
                user = user.data;
                if(user) {
                    $location.url("/user/"+user._id);
                } else {
                    vm.alert = "User not found";
                }
            });
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function init() {
        }
        init();

        function register() {
            vm.user._id = (new Date()).getTime();
            UserService.createUser(vm.user);
            $location.url('/user/' + vm.user._id);
        }
    }
})();