/**
 * Created by raghu on 2/8/2017.
 */
module.exports = function(app, userModel) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'name', 'email']
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    var auth = authorized;

    app.post('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/api/logout',logout);
    app.get('/api/loggedin',loggedin);
    app.post ('/api/register', register);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId/website/:websiteId", updateWebsite);

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/assignment/#/user/' + req.user._id);
        });

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {

                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:    email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function localStrategy(username, password, done) {
        userModel.findUserByCreadentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user[0]){
            userModel
                .findUserById(user[0]._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
        else
        {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }

    function register (req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

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