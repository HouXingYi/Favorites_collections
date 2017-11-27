const express = require('express');
const router = express.Router();

var user = require('../controller/user');

// '/server'下所有请求转发过来

router.get('/server/checkLogin', user.checkLogin);

router.post('/server/login', user.login);
router.post('/server/signUp', user.signUp);

module.exports = router