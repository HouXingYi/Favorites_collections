var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//收藏夹名
var collectionsListSchema = new mongoose.Schema({
    userName : {type:ObjectId,ref:'User'},
    collectionId : String,
    collectionName : String, 
    collectionDesc : String, //描述
    collectionNum : Number //排序
});

module.exports = collectionsListSchema
