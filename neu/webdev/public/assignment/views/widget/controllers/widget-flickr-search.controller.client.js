(function () {
    var app = angular
        .module("WebAppMaker");
    app.controller("FlickrImageSearchController", FlickrImageSearchController);


    function FlickrImageSearchController(FlickrService, WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
            url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
            WidgetService
                .updateWidgetFlickr(vm.widgetId, url)
                .then(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                });
        }
    }

})();