module.exports = function (mongoose, q) {

    var WidgetSchema = require('./widget.schema.server')(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        
    }
    
    function findAllWidgetsForPage(pageId) {
        
    }
    
    function findWidgetById(widgetId) {
        
    }
    
    function updateWidget(widgetId, widget) {
        
    }
    
    function deleteWidget(widgetId) {
        
    }

    function reorderWidget(pageId, start, end) {

    }
}