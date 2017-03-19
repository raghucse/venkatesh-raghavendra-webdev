module.exports = function (mongoose, q) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCreadentials: findUserByCreadentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
                if(err){
                    deferred.abort();
                }
                else {
                    deferred.resolve();
                }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        
    }

    function findUserByUsername(username) {

    }

    function findUserByCreadentials(username, password) {

    }

    function updateUser(userId, user) {

    }

    function deleteUser(userId) {

    }
};