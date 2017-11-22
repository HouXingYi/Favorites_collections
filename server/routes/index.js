
var Test = require('../controller/test');
const express = require('express');
const router = express.Router();
router.get('/test', Test.getAddress);
module.exports = router