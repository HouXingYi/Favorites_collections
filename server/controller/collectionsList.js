var CollectionsListModal = require('../models/collectionsList');

class CollectionsList{
	constructor(){
	}
	addCollection(req, res, next){

		// let userName = req.body.userName;

		let pars = {
			collectionId : parseInt(100000*Math.random()),
			collectionName : "第一个收藏夹名字2"
		}
		CollectionsListModal.find({collectionName:pars.collectionName},function(err, collection){ 
			if (err) {
				console.log(err)
			}
			if(collection.length > 0){ //收藏夹名字不可重复
				console.log(1);
				res.send({
					status : 0,
					msg : '收藏夹名字不可重复'
				});
			}else{
				console.log(2);
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
			}
		})

	}

	getAllAddCollections(req, res, next){

		CollectionsListModal
		.find()
		// .populate({path:''})
		.exec((err,docs)=>{
			console.log(docs);
			res.send({
				test : 1,
				docs : docs
			});
		});

	}

}

module.exports = new CollectionsList()