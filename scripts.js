var Broadcast = require('./broadcasts')

console.log('From Scripts')

var videos = document.querySelector('#videos')

window.broadcast = new Broadcast('coinbabe')
