/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "opo@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "ere@gmail.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "abc@gmail.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "xyz@gmail.com"}
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            users.push(angular.copy(user));
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }

        }
    }

})();