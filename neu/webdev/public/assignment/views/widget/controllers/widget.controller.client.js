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
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.doYouTrust = doYouTrust;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function doYouTrust(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length-1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getWidgetTemplateUrl(type) {
            type = type.toLowerCase();
            return "views/widget/templates/widget-"+type+".view.client.html";
        }
    }

    function NewWidgetController() {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];

        //Event Handlers
        vm.newHeaderWidget = newHeaderWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYouTubeWidget = newYouTubeWidget;

        function init() {
        }
        init();

        function newHeaderWidget() {
            var headerWidget ={"widgetType": "HEADER", "size": 2, "text": "GIZMODO"};
            WidgetService.createWidget(vm.pageID, headerWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");

        }

        function newImageWidget() {
            var imageWidget = {"widgetType": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            WidgetService.createWidget(vm.pageID, imageWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");

        }

        function newYouTubeWidget() {
            var youTubeWidget ={"widgetType": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService.createWidget(vm.pageID, youTubeWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
        }
    }

    function EditWidgetController(WidgetService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        //Event Handler
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWid = updateWid;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            type = type.toLowerCase();
            return "views/widget/templates/editors/widget-"+type+".view.client.html";
        }

        function updateWid(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetID);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }




})();