/**
 * Created by LT on 15-7-25.
 */
angular.module('starter.directives', [])

.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div id='allMap'></div>",
        link: function (scope, element, attrs) {

            var map = new BMap.Map("allMap");
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
        }
    };
});
