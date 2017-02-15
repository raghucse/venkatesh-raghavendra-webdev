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
                vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            }
            init();

        }

        function NewPageController($routeParams, PageService, $location) {
            var vm = this;
            vm.websiteId = $routeParams["wid"];
            vm.userId = $routeParams["uid"];
            vm.createPage = createPage;

            function init() {
                vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            }
            init();

            function createPage() {
                console.log(vm.page);
                vm.page._id = (new Date()).getTime();
                PageService.createPage(vm.websiteId, vm.page);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
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
                vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
                vm.page = PageService.findPageById(vm.pageId);
            }
            init();

            function deletePage() {
                PageService.deletePage(vm.pageId);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }

            function updatePage() {
                PageService.updatePage(vm.pageId, vm.page);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
        }
})();
