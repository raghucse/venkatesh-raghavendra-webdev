/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("WebsiteListController", WebsiteListController);
    app.controller("NewWebsiteController", NewWebsiteController);
    app.controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
        init();

        function createWebsite() {
            vm.website._id = (new Date()).getTime();
            WebsiteService.createWebsite(vm.userId, vm.website);
            $location.url("/user/"+vm.userId+"/website");
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }
    }


})();