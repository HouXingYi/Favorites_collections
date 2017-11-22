
var TestModels = require('../models/test2');

class Test2{
	constructor(){
	}
	POSTdata(req, res, next){
		console.log(req.body.firstName);
		var par = {
			firstName : req.body.firstName,
			lastName : req.body.lastName
		}

		TestModels.create(par, function(error,doc){
			if(error) {
				console.log(error);
			} else {
				console.log('save ok');
			}
		});

	}
}
module.exports = new Test2()