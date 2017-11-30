var collectionDetailListModel = require('../models/collectionDetailList');
var collectionListModel = require('../models/collectionsList');

class collectionDetailList{
	constructor(){
	}
	addNewItem(req, res, next){
		let  id = req.body.id;
		let  itemURL = req.body.itemURL;
		let  itemTitle = req.body.itemTitle;
		let  itemDesc = req.body.itemDesc;
		collectionListModel.findOne({collectionId:id},function(err,doc){
			var list_id = doc._id;
			collectionDetailListModel
			.findOne({CollectionsFA : list_id})
			.populate('CollectionsFA')
			.exec(function(err,item){
				if(item){ //添加
					item.CollectionItems.push({
						"itemURL":itemURL,
						"itemTitle":itemTitle,
						"itemDesc":itemDesc
					})
					item.save((err,item)=>{
						res.send({
							status : 1,
							msg : '添加成功',
							docs : item
						});
					})
				}else{ //第一次
					var collectionItem = new collectionDetailListModel({
						CollectionsFA : list_id, //收藏夹整体信息
						CollectionItems : [
							{
								"itemURL":itemURL,
								"itemTitle":itemTitle,
								"itemDesc":itemDesc
							}
						]
					})
					collectionItem.save((err,doc)=>{
						if(err){
							console.log(err)
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
		})
	}
	getItemList(req, res, next){
		let  id = req.body.id;
		collectionListModel.findOne({collectionId:id},function(err,doc){
			var list_id = doc._id;
			collectionDetailListModel
			.findOne({CollectionsFA : list_id})
			.populate('CollectionsFA')
			.exec(function(err,doc){
				if(doc){
					var list = doc.CollectionItems;
					res.send({
						status : 1,
						msg : 'showItemList',
						list :list
					});
				}else{
					res.send({
						status : 1,
						msg : 'showItemList',
						list :[]
					});
				}
			})
		})
	}
}

module.exports = new collectionDetailList()