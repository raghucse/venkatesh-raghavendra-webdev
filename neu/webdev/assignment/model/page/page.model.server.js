module.exports = function (mongoose, q) {

    var PageSchema = require('./page.schema.server')(mongoose);
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;
    
    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        PageModel.create(page, function (err, doc) {
            if(err){
                deferred.abort();
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();

        PageModel.find({_website: websiteId}, function (err, pages) {
            if(err){
                deferred.abort();
            }
            else {
                deferred.resolve(pages);
            }
        })

        return deferred.promise;
    }

    function findPageById(pageId) {
        
    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {

    }

}