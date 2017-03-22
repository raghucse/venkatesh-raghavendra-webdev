module.exports = function (mongoose) {

    var q = require('q');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}], //array of refe
        dateCreated: Date
    }, {collection: 'assignment.website'});

    WebsiteSchema.pre('remove', function(next) {
        this.model('PageModel')
            .find({_website: this._id }, function (err, pages) {
                pages.forEach(function(page){
                    page.remove(function(err){

                    });
                })
            });

        this.model('UserModel').update(
            {_id: this._user},
            {$pull: {websites: this._id}},
            {multi: true},
            next
        );

    });

    return WebsiteSchema;
}