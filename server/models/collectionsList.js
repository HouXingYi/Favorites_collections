var mongoose = require('mongoose');
var collectionsListSchema = require('../schemas/collectionsList')
module.exports = mongoose.model("CollectionsList",collectionsListSchema);