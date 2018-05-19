var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: '',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: '',
    // immediately ask for camera access
    autoRequestMedia: true,
    enableDataChannels: false,
    media: {
        audio: true,
        video: false
    },
    receiveMedia: { // FIXME: remove old chrome <= 37 constraints format
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0
    },
});

webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('RadioRunners');
});
