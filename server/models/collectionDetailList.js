var mongoose = require('mongoose');
var collectionDetailList = require('../schemas/collectionDetailList')
module.exports = mongoose.model("collectionDetailList",collectionDetailList);