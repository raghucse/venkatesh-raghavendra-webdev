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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites.data;
                });
        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites.data;
                });
        }
        init();

        function createWebsite() {

            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .then(function (website) {
                    vm.website = website.data;
                    UserService.updateWebsite(vm.userId, vm.website._id)
                        .then(function (status) {
                            $location.url("/user/"+vm.userId+"/website");
                        })
                });
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites.data;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (website) {
                    vm.website = website.data;
                });
        }
        init();

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });
        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .then(function (website) {
                    vm.website = website.data;
                    $location.url("/user/"+vm.userId+"/website");
                });

        }
    }


})();