module.exports = function (mongoose, q) {

    var WidgetSchema = require('./widget.schema.server')(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        uploadImage: uploadImage,
        updateWidgetFlickr: updateWidgetFlickr
    };
    return api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;

        WidgetModel.create(widget, function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
    
    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        WidgetModel.find({_page: pageId}, function (err, widgets) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(widgets);
            }
        })

        return deferred.promise;
    }
    
    function findWidgetById(widgetId) {
        var deferred = q.defer();

        WidgetModel.findById(widgetId, function (err, widget) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(widget);
            }
        })
        return deferred.promise;
    }
    
    function updateWidget(widgetId, widget) {
        var deferred = q.defer();

        WidgetModel.update({_id:widgetId},
            {$set:widget}
            , function (err, widget) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(widget);
                }
            })
        return deferred.promise;

    }
    
    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel.findById(widgetId, function (err, widget) {
            if(err){
                deferred.reject(err);
            }
            else {
                widget.remove(function (err) {
                    deferred.resolve();
                });
            }
        })
        return deferred.promise;
    }

    function reorderWidget(pageId, newmap) {
        var deferred = q.defer();

        findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                for (var i = 0; i < widgets.length; i++) {
                        var id = widgets[i]._id;
                        widgets[i].index = newmap[id];
                        widgets[i].save();
                }
                deferred.resolve();

            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function uploadImage(widgetId, width, serverPath) {

        var deferred = q.defer();
        WidgetModel.update(
            { _id : widgetId },
            {
                width: width,
                url: serverPath,
            }, function (err, user) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(user);
                }
            })
        return deferred.promise;
    }

    function updateWidgetFlickr(widgetId, url) {
        var deferred = q.defer();
        WidgetModel.update(
            { _id : widgetId },
            {
                url: url,
            }, function (err, user) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(user);
                }
            })
        return deferred.promise;
    }
}