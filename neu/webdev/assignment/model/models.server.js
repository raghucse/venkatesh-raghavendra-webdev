module.exports = function(mongoose) {
    var q = require('q');

    var userModel = require('./user/user.model.server.js')(mongoose, q);
    var pageModel = require('./page/page.model.server.js')(mongoose, q);
    var websiteModel = require('./website/website.model.server.js')(mongoose, q);
    var widgetModel = require('./widget/widget.model.server.js')(mongoose, q);

    var model = {
        userModel: userModel,
        pageModel: pageModel,
        websiteModel: websiteModel,
        widgetModel: widgetModel
    };

    return model;
}
