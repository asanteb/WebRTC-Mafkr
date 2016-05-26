window.RMCDefaultChannel = 'coinbabe'

var DEFAULT_ROOM  = 'spokane'
  , MODERATOR = 'snuggs'
  , CHANNEL = 'ABCDEF-' + window.RMCDefaultChannel
  , SESSION = { video: true, audio: true }
  , MAX_PARTICIPANTS = 4

  , videos = document.querySelector('#videos')
  , call = document.querySelector('#videos > button')
;

window.connection = new RTCMultiConnection(CHANNEL)
var TOKEN = connection.token()
connection.maxParticipantsAllowed = MAX_PARTICIPANTS

console.log('CHANNEL: ', CHANNEL)
console.log('Token: ', TOKEN)

;(function join(room) {
  if(room) {
    console.log('Session: ', SESSION)
    console.log('Joining Room: ', DEFAULT_ROOM)

    connection.join({
      session: SESSION,
      userid: MODERATOR,
      sessionid: DEFAULT_ROOM
    })

  } else {
    console.log('User Id: ', connection.userid)
    console.log('Moderator: ', connection.userid)
    console.log('Moderating Room: ', DEFAULT_ROOM)

    connection.userid = MODERATOR
    connection.session = SESSION

    connection.open({
      dontTransmit: true,
      sessionid: DEFAULT_ROOM
    })
  }
})(location.hash.slice(1));

connection.onconnected = function(event) {
  console.log('On Connected: ', arguments)
}

// dont-override-session allows you force RTCMultiConnection
// to not override default session of participants;
// by default, session is always overridden and set to the session coming from moderator!
connection.dontOverrideSession = false //true;

//connection.session = {
//  audio: true,
//  video: true
////// if there is a session id broadcast anonymously
////oneway: !connection.isInitiator
//};

connection.onstream = function(e) {
  videos.appendChild(e.mediaElement);

  if (e.type == 'remote') {
    // because "viewer" joined room as "oneway:true"
    // initiator will NEVER share participants
    // to manually ask for participants;
    // call "askToShareParticipants" method.
//  connection.askToShareParticipants();
  }

  // if you're moderator
  // if stream-type is 'remote'
  // if target user is broadcaster!
//if (connection.isInitiator && e.type == 'remote' && !e.session.oneway) {
//  // call "shareParticipants" to manually share participants with all connected users!
//  connection.shareParticipants({
//      dontShareWith: e.userid
//  });
//}
};


connection.onNewSession = function(session) {
  console.log('New Session: ', session.sessionid)
//if (!connection.isInitiator)
//  session.join({ oneway: true })
};
