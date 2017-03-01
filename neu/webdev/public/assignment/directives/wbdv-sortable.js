(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdv-sortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();