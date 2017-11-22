const express = require('express');
const router = express.Router();


var Test = require('../controller/test');
var Test2 = require('../controller/test2');


router.get('/test', Test.getAddress);
router.post('/testPOST', Test2.POSTdata);


module.exports = router