module.exports = function (mongoose) {

    var q = require('q');
/*    var UserModel = require('../user/user.model.server.js')(mongoose, q);
    var PageModel = require('../page/page.model.server.js')(mongoose, q);*/

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}], //array of refe
        dateCreated: Date
    }, {collection: 'assignment.website'});

    return WebsiteSchema;
}