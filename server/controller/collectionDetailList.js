var collectionDetailListModel = require('../models/collectionDetailList');
var collectionListModel = require('../models/collectionsList');

class collectionDetailList{
	constructor(){
	}
	addNewItem(req, res, next){
		console.log(req.body);
		let  id = req.body.id;
		let  itemURL = req.body.itemURL;
		let  itemTitle = req.body.itemTitle;
		let  itemDesc = req.body.itemDesc;
		let  itemType = req.body.itemType;
		let  coverPic = req.body.coverPic;
		coverPic
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
						"itemDesc":itemDesc,
						"itemType":itemType,
						"coverPic":coverPic
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
								"itemDesc":itemDesc,
								"itemType":itemType,
								"coverPic":coverPic
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
								msg : '新建成功',
								doc : doc
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
	updateItem(req, res, next){
		let doc = req.body;
		let itemURL = doc.itemURL;
		let itemDesc = doc.itemDesc;
		let itemTitle = doc.itemTitle;
		let itemType = doc.itemType;
		let itemId = doc.itemId;
		let listId = doc.listId;
		collectionListModel.findOne({collectionId:listId},function(err,doc){
			var list_id = doc._id;
			collectionDetailListModel
			.findOne({CollectionsFA : list_id})
			.populate('CollectionsFA')
			.exec(function(err,doc){
				var list = doc.CollectionItems;
				list.forEach(element => {
					let id = element._id;
					if(id == itemId){
						element.itemURL = itemURL;
						element.itemDesc = itemDesc;
						element.itemTitle = itemTitle;
						element.itemType = itemType;
					}
				});
				doc.save((err,items)=>{
					res.send({
						status : 1,
						msg : 'success',
						doc :items
					});
				})
			})
		})

	}
	deleteItem(req, res, next){
		let doc = req.body;
		let itemId = doc.itemId;
		let listId = doc.listId;
		collectionListModel.findOne({collectionId:listId},function(err,doc){
			var list_id = doc._id;
			collectionDetailListModel
			.findOne({CollectionsFA : list_id})
			.populate('CollectionsFA')
			.exec(function(err,doc){
				var list = doc.CollectionItems;
				var delIndex = 0;
				list.forEach((element,index) => {
					let id = element._id;
					if(id == itemId){
						delIndex = index;
					}
				});
				list.splice(delIndex,1);
				doc.save((err,items)=>{
					res.send({
						status : 1,
						msg : 'success'
					});
				})
			})
		})
	}
}

module.exports = new collectionDetailList()