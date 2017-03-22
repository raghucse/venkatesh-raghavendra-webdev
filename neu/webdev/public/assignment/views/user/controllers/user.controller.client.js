/**
 * Created by raghu on 2/8/2017.
 */


(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("LoginController", LoginController);
    app.controller("ProfileController", ProfileController);
    app.controller("RegisterController", RegisterController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.update =  update;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.then(function(user){
                vm.user = user.data;
            });
        }
        init();

        function update() {
            UserService
                .updateUser(vm.userId, vm.user)
                .then(function (user) {
                    vm.user = user.data;
                    vm.message = "User successfully updated";
                }, function (user) {
                    vm.error = "Unable to update user";
                });
        }

        function deleteUser(user) {
            var cfrm = confirm("Are you sure that you want to delete?")
            if(cfrm){
                UserService
                    .deleteUser(user._id)
                    .then(function () {
                        $location.url("/login");
                    },function () {
                        vm.error = "Unable to UnRegister User";
                    });
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
                if(user[0]) {
                    $location.url("/user/"+user[0]._id);
                } else {
                    vm.error = "User not found";
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
            UserService
                .findUserByUsername(vm.user.username)
                .then(function (user) {
                    user = user.data;
                    if(user[0]) {
                        vm.error = "sorry that username is taken";
                    }
                    else
                    {
                        UserService
                            .createUser(vm.user)
                            .then(function(user){
                                user = user.data;
                                $location.url('/user/' + user._id);
                            }, function (err) {
                                vm.error = 'sorry could not register';
                            })
                    }
                },function(err){
                    vm.error = 'sorry could not register';
                })
        }
    }
})();