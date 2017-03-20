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
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if(err){
                console.log(err);
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        })
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({username: username}, function (err, user) {
            if(err){
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        })
        return deferred.promise;
    }

    function findUserByCreadentials(username, password) {
        var deferred = q.defer();

        UserModel.find({$and: [{username: username}, {password: password}]}, function (err, user) {
            if(err){
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        })
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.update(
            { _id : userId },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }, function (err, user) {
                if(err){
                    deferred.abort();
                }
                else {
                    deferred.resolve(user);
                }
            })
        return deferred.promise;
    }

    function deleteUser(userId) {

    }
};