var Connection = require('../connections')

console.log('From Broadcasts')

module.exports = function (room) {
  console.log('New Broadcast: ', room)

  new Connection({ room: room, configuration: {video: true, audio: true} })
}
