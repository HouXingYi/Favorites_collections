var CollectionsListModal = require('../models/collectionsList');
var user = require('../models/user');

class CollectionsList{
	constructor(){
	}
	addCollection(req, res, next){
		let userName = req.body.userName;
		let collectionName = req.body.collectionName;
		let collectionDesc = req.body.collectionDesc;
		let pars = {
			collectionId : parseInt(100000*Math.random()),
			collectionName : collectionName,
			collectionDesc : collectionDesc
		}
		CollectionsListModal.find({collectionName:pars.collectionName},function(err, collection){ 
			if (err) {
				console.log(err)
			}
			if(collection.length > 0){ //收藏夹名字不可重复
				res.send({
					status : 0,
					msg : '收藏夹名字不可重复'
				});
			}else{
				user.findOne({name:userName})
				.exec(function(err, doc) {
					//分配id
					pars.userName = doc._id;
					let Collections = new CollectionsListModal(pars);
					Collections.save((err,Collection)=>{
						if (err) {
							console.log("Error:" + err);
						}
						else {
							res.send({
								status : 1,
								msg : '新建成功'
							});
						}
					})
				});
			}
		})
	}
	getAllAddCollections(req, res, next){
		CollectionsListModal
		.find()
		.populate('userName','name')
		.exec((err,docs)=>{
			res.send({
				status : 1,
				msg : 'success',
				docs : docs
			});
		});
	}

}

module.exports = new CollectionsList()