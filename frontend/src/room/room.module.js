(function(angular) {
  'use strict';

  angular
    .module('room', ['appCore'])
    .run(roomRun);

  /* @ngInject */
  function roomRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'room',
      config: {
        url: '/room',
        templateUrl: 'room/room.html',
        controller: 'RoomController',
        controllerAs: 'room',
        title: 'Room POC'
      }
    }
    ];
  }

})(angular);
