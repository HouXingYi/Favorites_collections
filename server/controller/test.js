
class Test{
	constructor(){
	}
	async getAddress(req, res, next){
		
        res.send({
            test : "success"
        })
	}
}

module.exports = new Test()