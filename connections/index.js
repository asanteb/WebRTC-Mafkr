console.log('From Connections')

var MAX_PARTICIPANTS = 4

module.exports = function (options) {
//if(typeof window.RTCMultiConnection == 'undefined') return;

  this.room = options.room
  this.configuration = options.configuration

  console.log('New Connection: ', this.room)
  console.log('Configuration: ', this.configuration)

//window.RMCDefaultChannel = 'coinbabe'

  connection = new RTCMultiConnection(this.room)
  connection.maxParticipantsAllowed = MAX_PARTICIPANTS

  // dont-override-session allows you force RTCMultiConnection
  // to not override default session of participants;
  // by default, session is always overridden and set to the session coming from moderator!
  connection.dontOverrideSession = false //true;

  connection.session = this.configuration

  connection.onconnected = function(event) {
    console.log('On Connected: ', arguments)
  }

  connection.onstream = function(e) {
    console.log('Adding Viewer')
    var figure = document.createElement('figure');

    figure.appendChild(e.mediaElement);

    videos.appendChild(figure);
  };

  connection.onNewSession = function(session) {
    console.log('New Session: ', session.sessionid)
  //if (!connection.isInitiator)
  //  session.join({ oneway: true })
  };

  console.log('Token: ', connection.token())

  connection.open({
    dontTransmit: true,
    sessionid: this.room
  })

//broadcast.join({
//  oneway: true,
//  session: SESSION,
//  userid: MODERATOR,
//  sessionid: DEFAULT_ROOM
//})
};
