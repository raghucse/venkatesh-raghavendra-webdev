/**
 * Created by raghu on 2/8/2017.
 */

/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);



    var widgets  = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%","url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"}
    ]

    function createWidget(req, res){
        var newWidget = req.body;
        newWidget.pageId = req.params.pageId;
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
}
