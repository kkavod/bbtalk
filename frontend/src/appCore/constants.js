/* global toastr:false, moment:false */
(function(angular, toastr, moment) {
    'use strict';

    angular
        .module('appCore')
        .constant('toastr', toastr)
        .constant('moment', moment);
})(angular, toastr, moment);
