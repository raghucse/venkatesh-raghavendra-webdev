/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app, WebsiteModel) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    app.put("/api/website/:websiteId/page/:pageId", updatePage);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        userId = req.params.userId;

        WebsiteModel.createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        WebsiteModel.updateWebsite(websiteId, website)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.deleteWebsite(websiteId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function updatePage(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;

        WebsiteModel.updatePage(websiteId, pageId)
            .then(function (website) {
                res.send(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }
}

