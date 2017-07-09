const redis = require('redis'),
      client = redis.createClient();

let sub = (c) => {
//  client.subscribe(c, e => {
//    console.log('channel:' + c);
//  })
}
sub();

const io = require('socket.io')();
const USER = [];
const USERSOCKET = {};

//socket
io.on('connect', (socket) => {
  socket.on('connectStatus', (msg) => {
    tobj = JSON.parse(msg);
    if (tobj.status) {
      USERSOCKET[tobj.name] = socket;
      USER.push(tobj.name)
    }
    else {
      USER.splice(USER.indexOf(tobj.name), 1);
      delete USERSOCKET[tobj.name];
    }
    client.lpush('talks', msg, (err,res) => {
      send = JSON.stringify({
        key: res,
        name: tobj.name,
        status: tobj.status,
        user: USER
      })
      io.sockets.emit('connectStatus', send)
    })
  })

  socket.on('talk', (text) => {
    tobj = JSON.parse(text);
    client.lpush('talks', text, (err,res) => {
      send = JSON.stringify({
        key: res,
        talk: tobj.talk,
        name: tobj.name
      })      
      io.sockets.emit('talk', send)
    })
       
  })
  client.on('message', (err, msg) => {
    socket.emit('talks', msg);
  })
  // client.subscribe('talks');
})

module.exports = io;