module.exports = function (mongoose, q) {

    var PageSchema = require('./page.schema.server')(mongoose);
    var PageModel = mongoose.model('PageModel', PageSchema);

}