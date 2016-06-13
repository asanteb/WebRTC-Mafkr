var counter = 0
var deviceList = []

window.onload = function() {
  getSources()
}

function getSources() {
  if ( ! MediaStreamTrack.getSources) {
    alert('Your browser does not support getSources, aborting.')
    return
  }

// MediaStreamTrack.getSources is deprecated.
// See https://www.chromestatus.com/feature/4765305641369600 for more details.
  MediaStreamTrack.getSources(function(devices) {
    for (var i = 0; i < devices.length; i++) {
//    console.log(devices[i])

      // audio preferences
      // video preferences

      if (devices[i].kind === 'video') {
        deviceList[i] = devices[i]
        videoMediaBy(deviceList[i].id)
      }
    }
  })
}

function videoMediaBy(id) {
  navigator.getUserMedia({
    video: {optional: [{sourceId: id}]},
    audio: false},
    mediaCallback,
    mediaFailedCallback
  )
}

function mediaCallback(stream) {
  var preferences = document.querySelector('#preferences')

  var figure = document.createElement('figure')
  var video  = document.createElement('video')

  video.setAttribute('id', 'view' + counter)
  video.autoplay = true

  figure.appendChild(video)
  preferences.appendChild(figure)

  // SHOULD BE MEMOIZED
  // stream.getVideoTracks()
  if (typeof stream.getVideoTracks()[0].label !== 'undefined') {
    var caption = document.createElement('caption')
    caption.innerHTML = stream.getVideoTracks()[0].label

    figure.appendChild(caption)
  }

//stream.getVideoTracks()[0].addEventListener('ended', errorMessage_)
  document.getElementById('view' + counter).srcObject = stream
  counter++
}

function mediaFailedCallback(error) {
  alert('User media request denied with error: ' + error.name);
}

console.log('From Preferences')
