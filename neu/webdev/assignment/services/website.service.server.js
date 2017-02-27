/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);

    var websites  = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(userId, website) {
        website.developerId = userId;
        websites.push(angular.copy(website));
    }

    function findWebsitesByUser(userId) {
        for (var i = 0; i < websites.length; i++) {
            if (websites[i].developerId == userId) {
                return websites[i];
            }
        }
        return null;
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }
    function findWebsiteById(websiteId) {
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                return angular.copy(websites[i]);
            }
        }
        return null;
    }

    function updateWebsite(websiteId, website) {
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                websites[i] = angular.copy(website);
            }
        }
        return null;
    }

    function deleteWebsite(websiteId) {
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                websites.splice(i, 1);
            }
        }
    }
}
