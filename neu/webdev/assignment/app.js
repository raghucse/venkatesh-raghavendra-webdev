module.exports = function(app) {

    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/assignment';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);

    var model = require('./model/models.server.js')(mongoose);

    require('./services/user.service.server.js')(app, model.userModel);
    require("./services/page.service.server.js")(app, model.pageModel);
    require("./services/website.service.server.js")(app, model.websiteModel);
    require("./services/widget.service.server.js")(app, model.widgetModel);
};