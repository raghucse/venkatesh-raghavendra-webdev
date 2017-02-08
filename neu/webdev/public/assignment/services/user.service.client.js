/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
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
            users.push(user);
        }

        function findUserById(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function fupdateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.remove(i);
                }
            }

        }
    }

})();