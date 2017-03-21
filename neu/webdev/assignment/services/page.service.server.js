/**
 * Created by raghu on 2/8/2017.
 */

/**
 * Created by raghu on 2/8/2017.
 */
module.exports = function(app, PageModel) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    var pages  = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ]

    function createPage(req, res){
        var newPage = req.body;
        var websiteId = req.params.websiteId;

        PageModel.createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            })


    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        PageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id == pageId) {
                res.json(pages[i]);
                return;
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id == pageId) {
                pages[i] = page;
                res.json(pages[i]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id == pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
}
