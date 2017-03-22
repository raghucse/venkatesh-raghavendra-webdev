module.exports = function (mongoose) {

    var q = require('q');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: Date
    }, {collection: 'assignment.user'});

    UserSchema.pre('remove', function(next) {

        this.model('WebsiteModel')
            .find({_user: this._id }, function (err, websites) {
                websites.forEach(function(website){
                    website.remove(function(err){

                    });
                })
            });

       // this.model('WebsiteModel').remove({ _user: this._id }, next);'' +
        next();
    });

    return UserSchema;
};