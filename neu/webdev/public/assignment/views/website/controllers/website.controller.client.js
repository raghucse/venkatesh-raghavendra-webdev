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

    function NewWebsiteController() {
        var vm = this;
    }

    function EditWebsiteController() {
        var vm = this;
    }


})();