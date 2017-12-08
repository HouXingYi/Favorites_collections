var CollectionsListModal = require('../models/collectionsList');
var user = require('../models/user');

class CollectionsList{
	constructor(){
	}
	addCollection(req, res, next){
		let userName = req.body.userName;
		let collectionName = req.body.collectionName;
		let collectionDesc = req.body.collectionDesc;
		let cateList = req.body.cateList;
		let pars = {
			collectionId : parseInt(100000*Math.random()),
			collectionName : collectionName,
			collectionDesc : collectionDesc,
			cateList : cateList
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

		let userName = req.query.userName;
		user
		.findOne({name : userName})
		.exec((err,doc)=>{
			let userId = doc._id;
			CollectionsListModal
			.find({userName : userId})
			.populate('userName','name')
			.exec((err,docs)=>{
				res.send({
					status : 1,
					msg : 'success',
					docs : docs
				});
			});
		})

	}
	upDateCollection(req,res,next){
		let userName = req.body.userName;
		let oldCollectionName = req.body.oldCollectionName;
		let newCollectionName = req.body.newCollectionName;
		let newCollectionDesc = req.body.newCollectionDesc;
		user
		.findOne({name : userName})
		.exec((err,doc)=>{
			let userId = doc._id;
			CollectionsListModal
			.findOne({
				userName : userId,
				collectionName : oldCollectionName
			})
			.exec((err,doc)=>{
				if(err){
					console.log(err);
				}else{
					doc.collectionName = newCollectionName;
					doc.collectionDesc = newCollectionDesc;
					doc.save(function (err, updatedTank) {
						if (err) return handleError(err);
						res.send({
							status : 1,
							msg : 'success'
						});
					});
				}
			});
		})
	}
	deleteCollection(req,res,next){
		let userName = req.query.userName;
		let cName = req.query.cName;
		user
		.findOne({
			name : userName
		})
		.exec((err,doc)=>{
			let userId = doc._id;
			CollectionsListModal
			.findOne({
				userName : userId,
				collectionName : cName
			})
			.exec((err,doc)=>{
				doc.remove((err,doc)=>{
					if(err){
						console.log(err)
					}else{
						res.send({
							status : 1,
							msg : 'success'
						});
					}
				});
			});
		})
	}
	getCollectionByName(req,res,next){
		let userName = req.query.userName;
		let cName = req.query.cName;
		user
		.findOne({
			name : userName
		})
		.exec((err,doc)=>{
			let userId = doc._id;
			CollectionsListModal
			.findOne({
				userName : userId,
				collectionName : cName
			})
			.exec((err,doc)=>{

				res.send({
					status : 1,
					msg : 'success',
					doc : {
						collectionName : doc.collectionName,
						collectionDesc : doc.collectionDesc
					}
				});

			});
		})
	}
}

module.exports = new CollectionsList()