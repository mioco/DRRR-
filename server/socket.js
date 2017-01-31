const redis = require('redis'),
      redisClient = redis.createClient({auth_pass: 'redis'});

let sub = (c) => {
  redisClient.subscribe(c, e => {
    console.log('channel:' + c);
  })
}
sub();

const io = require('socket.io')();

//socket
io.on('connection', (socket) => {
  redisClient.on('message', (err, msg) => {
    socket.emit('talks', msg);
  })
})

module.exports = io;