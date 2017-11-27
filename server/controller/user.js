var UserModel = require('../models/user');

class User{
	constructor(){
	}
	checkLogin(req, res, next){
		var user = req.session.user
		var name;
		if(!user){
			res.send({
				name : "unlogin",
				status : 0
			})
		}else{
			res.send({
				name : user.name,
				status : 1
			})
		}
		
	}
	//登录
	login(req, res, next){  
		var name = req.body.name
		var passWord = req.body.passWord
		UserModel.findOne({name: name}, function(err, user) {
			// status : -1  不存在该账户
			// status : 0  密码错误
			// status : 1  密码正确
			if (err) {
				console.log(err)
			}
			if (!user) {
				res.send({
					status : -1,
					msg : "不存在该账户"
				})
				return false
			}
			user.comparePassword(passWord, function(err, isMatch) {
				if (err) {
					console.log(err)
				}
		
				if (isMatch) {
					req.session.user = user; //添加session
					res.send({
						status : 1,
						msg : "密码正确"
					})
				}
				else {
					res.send({
						status : 0,
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
			// status : 0  重复
			// status : 1  成功
			if (err) {
				console.log(err)
			}
			if(user.length > 0){ //不可重复注册
				res.send({
					status : 0,
					msg : '不可重复注册'
				});
			}else{
				let user = new UserModel(pars);
				user.save((err,user)=>{
					if (err) {
						console.log("Error:" + err);
					}
					else {
						res.send({
							status : 1,
							msg : '注册成功'
						});
					}
				})
			}
		})
	}

}

module.exports = new User()