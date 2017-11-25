const express = require('express');
const router = express.Router();

var user = require('../controller/user');

router.post('/login', user.login);
router.post('/signUp', user.signUp);

module.exports = router