/**
 * Created by raghu on 2/8/2017.
 */

/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", updateWidgetOrder);



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
        newWidget.pageId = req.params.pageId;

        var count = 0;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId == newWidget.pageId) {
                count++;
            }
        }
        newWidget.index = count;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var allWidgets = [];
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId == pageId) {
                allWidgets.push(widgets[i]);
            }
        }
        res.json(allWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i] = widget;
                res.json(widgets[i]);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
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

        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = serverPath
                res.redirect("/assignment/index.html#/user/"+userId+ "/website/"+websiteId+"/page/"+pageId+"/widget");
                return;
            }
        }
    }


    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var newmap = req.body;
        for (var i = 0; i < widgets.length; i++) {
            if(widgets[i].pageId = pageId) {
                id = widgets[i]._id;
                widgets[i].index = newmap[id];
            }

        }
        res.sendStatus(200);
    }

}
