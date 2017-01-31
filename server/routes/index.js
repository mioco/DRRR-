var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  //是否登录，否返回isLogin false
  let isLogin = {};
  if(!req.session) isLogin.isLogin = false;
  else isLogin.isLogin = true;
  res.render('index', isLogin);
});

router.post('/addTalk', (req, res, next) => {
  res.send('is ok')
})

router.get('/initTalks', (req, res, next) => {
  //从redis获取数据，返回talks
})

router.post('/addTalk', (req, res, next) => {
  res.send('is ok')
})

module.exports = router;
