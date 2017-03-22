module.exports = function (mongoose) {

    var q = require('q');
    var types = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'];
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: types},
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



    WidgetSchema.pre('remove', function(next) {
        this.model('PageModel').update(
            {_id: this._page},
            {$pull: {widgets: this._id}},
            {multi: true},
            next
        );
    });

    return WidgetSchema;
}