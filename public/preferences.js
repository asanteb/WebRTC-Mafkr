var window = window || {}

window.onload = function getSources() {
  navigator.mediaDevices.enumerateDevices()
    .then(devicesAvailable)
  //.catch(handleError)
}

function devicesAvailable(devices) {
  devices = devices.filter(function(device) { return device.kind === 'videoinput' })
  // ^^^ Push this out to generic feature then filter based on audio/video

  console.log('===============================================================')
  for(var i=0; i< devices.length; i++) {
    videoMediaFrom( devices[i] )
  }
  console.log('===============================================================')
}

function videoMediaFrom(source) {
  console.log('video media from: ', source)

  var settings = {
    audio: false,

    video: {
      mandatory: {
//      width: { min: 320 },
//      height: { min: 180 }
      },

      optional: [
        { frameRate: 30 },
        { facingMode: 'user' },
        { width: { max: 1280 } },
        { sourceId: source.deviceId }
      ]
    }
  }


  navigator.getUserMedia( settings,
    mediaCallback, mediaFailedCallback
  )
}

function mediaCallback(stream) {
  var preferences = document.querySelector('#preferences')
    , figure = document.createElement('figure')
    , video  = document.createElement('video')

  console.log('===============================================================')
  console.log('stream', stream)
  console.log('===============================================================')
//console.log('video tracks', stream.getVideoTracks())
  console.log('===============================================================')

//video.addEventListener('ended', errorMessage_)
  video.srcObject = stream
  video.autoplay = true

  figure.appendChild(video)
  preferences.appendChild(figure)

  // SHOULD BE MEMOIZED
  // stream.getVideoTracks() MediaStreamTrack
  if (typeof stream.getVideoTracks()[0].label !== 'undefined') {
    var caption = document.createElement('caption')
    caption.innerHTML = stream.getVideoTracks()[0].label

    figure.appendChild(caption)
  }
}

function mediaFailedCallback(error) {
  alert('User media request denied with error: ' + error.name);
}

console.log('From Preferences')
