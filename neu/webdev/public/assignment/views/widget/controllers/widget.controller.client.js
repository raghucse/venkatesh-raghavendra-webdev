/**
 * Created by raghu on 2/8/2017.
 */
(function() {
    var app = angular
        .module("WebAppMaker");
    app.controller("WidgetListController", WidgetListController);
    app.controller("NewWidgetController", NewWidgetController);
    app.controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams,WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.doYouTrust = doYouTrust;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            console.log(vm.widgets);
        }
        init();

        function doYouTrust(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length-1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }

    function NewWidgetController() {
        var vm = this;
    }

    function EditWidgetController() {
        var vm = this;
    }




})();