module.exports = function (mongoose, q) {

    var WebsiteSchema = require('./website.schema.server')(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        WebsiteModel.create(website, function (err, doc) {

            if(err){
                deferred.abort();
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        
    }
    
    function findWebsiteById(websiteId) {
        
    }

    function updateWebsite(websiteId, website) {
        
    }

    function deleteWebsite(websiteId) {
        
    }
}