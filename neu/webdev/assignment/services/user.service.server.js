/**
 * Created by raghu on 2/8/2017.
 */
module.exports = function(app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    app.put("/api/user/:userId/website/:websiteId", updateWebsite);

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                    res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCreadentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel.updateUser(userId, newUser)
            .then(function (user) {
                console.log(user);
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(function (user) {
                res.send(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function updateWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;

        userModel.updateWebsite(userId, websiteId)
            .then(function (user) {
                res.send(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

};