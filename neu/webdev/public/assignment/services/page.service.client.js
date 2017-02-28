/**
 * Created by raghu on 2/8/2017.
 */

/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
        };
        return api;

        function createPage(websiteId, page){
            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function findPagesByWebsiteId(websiteId) {
            console.log("Finding all by Id");
            return $http.get("/api/website/"+websiteId+"/page");
        }

        function findPageById(pageId) {
            console.log("Finding by page");
            return $http.get("/api/page/"+pageId);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }
    }

})();