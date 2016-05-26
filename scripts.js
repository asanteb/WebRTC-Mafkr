var videos = document.querySelector('#videos');
var call = document.querySelector('#videos > button');

this.disabled = true;

window.connection = new RTCMultiConnection();

// dont-override-session allows you force RTCMultiConnection
// to not override default session of participants;
// by default, session is always overridden and set to the session coming from moderator!
connection.dontOverrideSession = true;

connection.session = {
  audio: true,
  video: true
//  oneway: role == 'Anonymous Viewer'
};

connection.onstream = function(e) {
  videos.appendChild(e.mediaElement);

  if (e.type == 'remote') {
    // because "viewer" joined room as "oneway:true"
    // initiator will NEVER share participants
    // to manually ask for participants;
    // call "askToShareParticipants" method.
    connection.askToShareParticipants();
  }

  // if you're moderator
  // if stream-type is 'remote'
  // if target user is broadcaster!
  if (connection.isInitiator && e.type == 'remote' && !e.session.oneway) {
    // call "shareParticipants" to manually share participants with all connected users!
    connection.shareParticipants({
        dontShareWith: e.userid
    });
  }
};


connection.onNewSession = function(session) {
//  if (role == 'Anonymous Viewer') {
//    session.join({
//      oneway: true
//    });
//  }

//  if (role == 'Broadcaster') {
//    session.join();
//  }
};

connection.open({
  sessionid: connection.channel,
  captureUserMediaOnDemand: false
});

//  connection.connect(connection.channel);
