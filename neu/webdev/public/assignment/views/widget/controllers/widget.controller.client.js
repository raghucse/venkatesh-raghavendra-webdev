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

        function init() {
             WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (widgets) {
                    vm.widgets = widgets.data;
                    vm.widgets.sort(function(a,b) {return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);} );
                });
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

    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.newHeaderWidget = newHeaderWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYouTubeWidget = newYouTubeWidget;

        function init() {
        }
        init();

        function newHeaderWidget() {
            var headerWidget ={"widgetType": "HEADER", "size": 2, "text": "New Header"};
            headerWidget._id = (new Date()).getTime();
            WidgetService
                .createWidget(vm.pageId, headerWidget)
                .then(function (newWidget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+headerWidget._id);
                });

        }

        function newImageWidget() {
            var imageWidget = {"widgetType": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            imageWidget._id = (new Date()).getTime();;
            WidgetService
                .createWidget(vm.pageId, imageWidget)
                .then(function (newWidget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+imageWidget._id);
                });

        }

        function newYouTubeWidget() {
            var youTubeWidget ={"widgetType": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            youTubeWidget._id = (new Date()).getTime();
            WidgetService
                .createWidget(vm.pageId, youTubeWidget)
                .then(function (newWidget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+youTubeWidget._id);
                });
        }
    }

    function EditWidgetController(WidgetService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWid = updateWid;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget =
                WidgetService
                    .findWidgetById(vm.widgetId)
                    .then(function (widget) {
                        vm.widget = widget.data;
                    });
        }
        init();

        function getEditorTemplateUrl(type) {
            type = type.toLowerCase();
            return "views/widget/templates/editors/widget-"+type+".view.client.html";
        }

        function updateWid(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }
    }
})();