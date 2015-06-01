(function(angular, kurentoUtils, Faye) {
  'use strict';

  angular.module('room')
    .controller('RoomController', RoomController);


  function RoomController(config) {
    var mediaConstraints = {
      audio : true,
      video : {
        mandatory : {
          maxWidth: 320,
          maxHeight: 240,
          minFrameRate: 1,
          maxFrameRate: 10
        }
      }
    };
    var fayeClient = new Faye.Client(config.fayeUrl);

    var remoteVideo = document.querySelector('#remoteVideo');
    var localVideo = document.querySelector('#localVideo');

    var userName = window.prompt("User name?");

    var options = {
      oncandidategatheringdone: onCandidateGatheringDone,
      localVideo: localVideo,
      remoteVideo: remoteVideo,
      mediaConstraints: mediaConstraints
    };

    var webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, peerCallback);

    fayeClient.subscribe('/room/' + userName, onReceiveAnswer);

    ////

    function onCandidateGatheringDone () {
      fayeClient.publish('/room', {
        message: 'user-joined',
        userName: userName,
        sdpOffer: webRtcPeer.getLocalSessionDescriptor().sdp
      });
    }

    // We should receive an answer from server showing the combined picture
    function onReceiveAnswer(message) {
      // Register the answer to the webRtcPeer.
      webRtcPeer.processAnswer(message.sdpAnswer);
    }

    function peerCallback(error) {
      if (error) {
        return onError(error);
      }
      webRtcPeer.generateOffer(onOffer);
    }

    // Send offer to kurento. This offer is the local video transmission.
    function onOffer(error) {
      if (error) {
        return onError(error);
      }
    }

    function onError(error) {
      console.error(error);
    }
  }
})(angular, kurentoUtils, Faye);
