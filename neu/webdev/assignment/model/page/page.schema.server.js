module.exports = function (mongoose) {

    var q = require('q');
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}], //array of refe
        dateCreated: Date
    }, {collection: 'assignment.page'});

    return PageSchema;
}