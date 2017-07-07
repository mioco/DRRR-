const redis = require('redis'),
      redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("Error " + err);
});
let sub = (c) => {
  redisClient.subscribe(c, e => {
    console.log('channel:' + c);
  })
}
sub('talks');

redisClient.on('message', (error, res) => {
  console.log(res)
})