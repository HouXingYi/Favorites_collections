var UserModel = require('../models/user');

class User{
	constructor(){
	}
	//登录
	login(req, res, next){  //关键在于加密与持久化保持
		
		var name = req.body.name
		var passWord = req.body.passWord

		UserModel.findOne({name: name}, function(err, user) {
			if (err) {
				console.log(err)
			}
		
			if (user.length == 0) {
				res.send({
					msg : "不存在该账户"
				})
				return false
			}
		
			user.comparePassword(passWord, function(err, isMatch) {
				if (err) {
					console.log(err)
				}
		
				if (isMatch) {
					res.send({
						msg : "密码正确"
					})
				}
				else {
					res.send({
						msg : "密码错误"
					})
				}
			})

		})
	}
	//注册
	signUp(req, res, next){
		var pars = {
			name:req.body.name,
			passWord:req.body.passWord
		}
		UserModel.find({name:req.body.name},function(err, user){ 
			if (err) {
				console.log(err)
			}
			if(user.length > 0){ //不可重复注册
				res.send({
					singup:'repeat'
				});
			}else{
				let user = new UserModel(pars);
				user.save((err,user)=>{
					if (err) {
						console.log("Error:" + err);
					}
					else {
						res.send({
							singup:'success'
						});
					}
				})
			}
		})
	}
}

module.exports = new User()