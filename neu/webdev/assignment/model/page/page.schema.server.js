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

    PageSchema.pre('remove', function(next) {
        this.model('WidgetModel').remove({ _page: this._id }, next);

        this.model('WebsiteModel').update(
            {_id: this._website},
            {$pull: {pages: this._id}},
            {multi: true},
            next
        );

    });

    return PageSchema;
}