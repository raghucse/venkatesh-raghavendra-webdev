/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
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
            "updateUser": fupdateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            users.push(angular.copy(user));
        }

        function findUserById(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function fupdateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return angular.copy(users[i]);
                }
            }
            return null;
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