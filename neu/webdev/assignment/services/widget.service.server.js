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

    var widgets  = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO", "index": "0"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum", "index": "1"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%","url": "http://lorempixel.com/400/200/", "index": "2"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum", "index": "3"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum", "index": "4"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","url": "https://youtu.be/AM2Ivdi9c4E", "index": "5"},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum", "index": "6"}
    ]

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
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i].url = link.url;
                res.sendStatus(200);
                return;
            }
        }
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
