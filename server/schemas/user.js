var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    name :String,
    passWord : String
});

//加密
UserSchema.pre('save', function(next) {
    var user = this
    //加盐加密
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.passWord, salt, function(err, hash) {
        if (err) return next(err)

        user.passWord = hash
        next()
        })
    })
})
//实例方法
UserSchema.methods = {
    comparePassword: function(_password, cb) {
      bcrypt.compare(_password, this.passWord, function(err, isMatch) {
        if (err) return cb(err)
  
        cb(null, isMatch)
      })
    }
  }



module.exports = UserSchema
