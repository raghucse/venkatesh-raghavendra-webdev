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

    function NewWidgetController($routeParams, $location, WidgetService, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.newHeaderWidget = newHeaderWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYouTubeWidget = newYouTubeWidget;
        vm.newTextWidget = newTextWidget;
        vm.newHTMLWidget = newHTMLWidget;

        function init() {
        }
        init();

        function newHeaderWidget() {
            var headerWidget ={"type": "HEADING", "size": 2, "text": "New Heading"};
            WidgetService
                .createWidget(vm.pageId, headerWidget)
                .then(function (headerWidget) {
                    headerWidget = headerWidget.data;
                    var widgetId = headerWidget._id;
                    PageService.updateWidget(vm.pageId, widgetId)
                        .then(function (page) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+headerWidget._id);
                        })
                });
        }

        function newImageWidget() {
            var imageWidget = {"type": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            WidgetService
                .createWidget(vm.pageId, imageWidget)
                .then(function (imageWidget) {
                    imageWidget = imageWidget.data;
                    var widgetId = imageWidget._id;
                    PageService.updateWidget(vm.pageId, widgetId)
                        .then(function (doc) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+imageWidget._id);
                        })
                });

        }

        function newYouTubeWidget() {
            var youTubeWidget ={"type": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService
                .createWidget(vm.pageId, youTubeWidget)
                .then(function (youTubeWidget) {
                    youTubeWidget = youTubeWidget.data;
                    var widgetId = youTubeWidget._id;
                    PageService.updateWidget(vm.pageId, widgetId)
                        .then(function (page) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+youTubeWidget._id);
                        })
                });
        }

        function newTextWidget() {
            var textWidget ={"type": "INPUT", "rows": 5, "placeholder": "Insert text",
                "formatted": "false" };
            WidgetService
                .createWidget(vm.pageId, textWidget)
                .then(function (textWidget) {
                    textWidget = textWidget.data;
                    PageService.updateWidget(vm.pageId, textWidget._id)
                        .then(function (page) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+textWidget._id);
                        })
                });
        }

        function newHTMLWidget() {
            var HTMLWidget ={"type": "HTML", "text": "sample text"};
            WidgetService
                .createWidget(vm.pageId, HTMLWidget)
                .then(function (HTMLWidget) {
                    HTMLWidget = HTMLWidget.data;
                    PageService.updateWidget(vm.pageId, HTMLWidget._id)
                        .then(function (page) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+HTMLWidget._id);
                        })
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
            if(vm.widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    });
            }
            else{
                vm.nameError = "Widget Name is required";
            }
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