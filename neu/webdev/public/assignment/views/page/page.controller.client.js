/**
 * Created by raghu on 2/8/2017.
 */


(function() {
    var app = angular
         .module("WebAppMaker");
         app.controller("PageListController", PageListController);
         app.controller("NewPageController", NewPageController);
         app.controller("EditPageController", EditPageController);

        function PageListController() {
            var vm = this;
        }

        function NewPageController() {
            var vm = this;
        }

        function EditPageController() {
            var vm = this;
        }
})();
