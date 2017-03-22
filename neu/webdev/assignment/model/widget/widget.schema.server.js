module.exports = function (mongoose) {

    var q = require('q');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        index: Number,
        formatted: Boolean,
        dateCreated: Date
    }, {collection: 'assignment.widget'});

    return WidgetSchema;
}