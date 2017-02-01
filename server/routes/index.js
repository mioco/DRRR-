var express = require('express');
var router = express.Router();
var redis = require('redis'),
    client = redis.createClient({auth_pass: 'redis'});
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/initTalks', (req, res, next) => {
  //从redis获取数据，返回talks
})

router.get('/isLogin', (req, res, next) => {
  if(!req.session || !req.session.name) res.send({isLogin: false})
  else res.send({isLogin: true, name: req.session.name})
})

module.exports = router;
