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

        function NewPageController() {
            var vm = this;
        }

        function EditPageController() {
            var vm = this;
        }
})();
