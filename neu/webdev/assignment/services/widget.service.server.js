/**
 * Created by raghu on 2/8/2017.
 */

/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app, WidgetModel) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/flickr/:widgetId", updateWidgetFlickr);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", reorderWidget);

    function createWidget(req, res){
        var newWidget = req.body;
        var pageId = req.params.pageId;

        WidgetModel.createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        WidgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        WidgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        WidgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function updateWidgetFlickr(req, res) {
        var widgetId = req.params.widgetId;
        var link = req.body;
        WidgetModel.updateWidgetFlickr(widgetId, link.url)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        WidgetModel.deleteWidget(widgetId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId         = req.body.userId;
        var pageId         = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var serverPath = "../../../../../uploads/"+filename;

        WidgetModel.uploadImage(widgetId, width, serverPath)
            .then(function (status) {
                res.redirect("/assignment/index.html#/user/"+userId+ "/website/"+websiteId+"/page/"+pageId+"/widget");
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }


    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var newmap = req.body;

        WidgetModel.reorderWidget(pageId, newmap)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

}
