const express = require('express');
const router = express.Router();

var user = require('../controller/user');
var collectionsList = require('../controller/collectionsList');
var collectionsDetailList = require('../controller/collectionDetailList');


// '/server'下所有请求转发过来
//用户相关
router.get('/server/checkLogin', user.checkLogin); //是否登录
router.get('/server/logout', user.logout); //登出
router.post('/server/login', user.login); //登录
router.post('/server/signUp', user.signUp); //注册

//添加收藏夹
router.post('/server/addCollection', collectionsList.addCollection); //添加收藏夹
router.get('/server/getCollections', collectionsList.getAllAddCollections); //获得收藏夹列表

//收藏夹下的收藏列表
router.post('/server/addNewItem', collectionsDetailList.addNewItem); //添加新收藏
router.post('/server/getItemList', collectionsDetailList.getItemList); //获得收藏列表


module.exports = router