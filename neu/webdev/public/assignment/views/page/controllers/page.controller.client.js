/**
 * Created by raghu on 2/8/2017.
 */


(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("PageListController", PageListController);
    app.controller("NewPageController", NewPageController);
    app.controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            var promise = PageService.findPagesByWebsiteId(vm.websiteId);
            promise.then(function (pages) {
                vm.pages = pages.data;
            });

        }
        init();

    }

    function NewPageController($routeParams, PageService, $location, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPagesByWebsiteId(vm.websiteId);
            promise.then(function (pages) {
                vm.pages = pages.data;
            });
        }
        init();

        function createPage() {
         if(vm.page && vm.page.name) {
             PageService
                 .createPage(vm.websiteId, vm.page)
                 .then(function (page) {
                     vm.page = page.data;
                     WebsiteService
                         .updatePage(vm.page._website, vm.page._id)
                         .then(function (website) {
                             $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                         })
                 });
         }
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages.data;
                });
            PageService
                .findPageById(vm.pageId)
                .then(function (page) {
                    vm.page = page.data;
                });
        }
        init();

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });

        }

        function updatePage() {
            if(vm.page && vm.page.name){
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(function (page) {
                        vm.page = page.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }
    }
})();
