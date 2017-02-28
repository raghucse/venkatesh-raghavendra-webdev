/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    var websites  = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite.developerId = req.params.userId;
        websites.push(newWebsite);
        res.json(newWebsite)
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(userId == websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
          var websiteId = req.params.websiteId;
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                res.json(websites[i]);
                return;
            }
        }
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                websites[i] = website;
                res.json(website);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
}

