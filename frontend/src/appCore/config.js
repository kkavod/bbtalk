(function () {
    'use strict';

    var core = angular.module('appCore');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[app Error] ',
        appTitle: 'app',
        fayeUrl: 'http://rt-dev.kbb1.com:9494/pubsub',
        kurentoWsUri: 'wss://webrtc-dev.kbb1.com:8433/kurento'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure($logProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

})(angular);
