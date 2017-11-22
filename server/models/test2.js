var mongoose = require('mongoose');

var test2 = new mongoose.Schema({
    firstName :String,
    lastName : String
});
  
module.exports = mongoose.model("TestModels",test2);