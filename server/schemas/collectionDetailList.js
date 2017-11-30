var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//收藏夹名
var collectionDetailList = new mongoose.Schema({
    CollectionsFA : {type:ObjectId,ref:'CollectionsList'}, //收藏夹整体信息
    CollectionItems : [
        {
            "itemURL":String,
            "itemTitle":String,
            "itemDesc":String
        }
    ]
});

module.exports = collectionDetailList
