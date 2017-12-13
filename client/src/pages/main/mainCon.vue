<template>
  <div class="mainContainer">
    <div class="mainBox">
      <div class="ConTopBar">
        <div class="mainTopBar" v-show="isMainTopBar">
          <div class="myFavor topleft">
            {{collectionName}}
          </div>
          <div class="editAll"  @click="showEditAll">
            <span class="editAllLink">批量编辑网站</span>
          </div>
          <div class="editCollection" 
               @click="showEditcoll" 
               v-show="!addNewTip">
            设置收藏夹
          </div>
        </div>
        <div class="editTopBar editAllTopBar" v-if="isEditAllShow">
          <span>已选择<i style="color:#02b875;">0</i>个</span>
          <label class="checkAllBox" for="checkAll">
            <input type="checkbox" id="checkAll" v-model="isCheckAll">
            <span>全选</span>
          </label>
          <span class="Hbutton btn" @click="deletItems">删除</span>
          <span class="Hbutton btn" @click="showMainCon" >取消</span>
        </div>
        <div class="editTopBar" v-show="isEditTopBar">
          <span @click="showMainCon" class="topleft">返回</span>
          <span class="topCenterTitle">设置收藏夹</span>
        </div>
        <div class="editTopBar" v-show="isAddNewItemBar">
          <span @click="showMainCon" class="topleft">返回</span>
          <span class="topCenterTitle">新增收藏</span>
        </div>
        <div class="editTopBar" v-show="isitemDetailBar">
          <span @click="showMainCon" class="topleft">返回</span>
          <span class="topCenterTitle">收藏详情</span>
        </div>
      </div>
      <div class="ConBody">
        <div class="groupControlBar" v-show="isMainCon">

          <ul class="groupList" v-show="!addNewTip">
            <li :class="{'curAdr':-1==nowCate}" @click="changeCate(-1)"><a href="#">全部</a></li>
            <li :class="{'curAdr':index==nowCate}" 
                v-for="(cate,index) in cateList" 
                @click="changeCate(index)">
              <a href="#">{{cate.cateName}}</a>
            </li>
          </ul>

          <!-- <div class="addGroup">添加</div> -->
          <!-- <div class="editGroup">编辑</div> -->

        </div>
        <div class="ConListConatiner clearfix" v-show="isMainCon">
          <Spin :showSpin="isShowSpin"></Spin>
          <ul v-show="!addNewTip">

            <li class="ConItem addNewItem" 
                @click="showAddNewItem">
              <span class="itemTitle">添加新收藏</span>
            </li>

            <li class="ConItem" 
                v-for="(item,index) in showItemList" 
                @click="openLink(index)"
                :class="{
                  'showSet' : index == showSetIndex
                }"
                @mouseover="showSet(index)"
                @mouseout="hideSet(index)">
              <span class="itemTitle">{{item.itemTitle}}</span>
              <img :src="item.coverPic" alt="" class="coverPicHolder">
              <span class="setItem" @click.stop="openItemDetail(index)">设置</span>

              <div class="itemMask" 
                   :class="{selected:item.flag}"
                   v-show="isEditAllShow"
                   @click.stop="pushItem(item,index)">
                   <img v-show="item.flag" class="dIcon" src="static/d_icon.png" alt="">
              </div>

            </li>
          </ul>
          <div v-show="addNewTip">
            请添加收藏夹
          </div>
        </div>
        <editcoll v-if="isEdit" 
                  :cName="collectionName"
                  @close="showMainCon">
        </editcoll>
        <addNewItem v-if="isAddNewItem" 
                    :listId="listId"
                    :cateList="cateList"
                    @close="showMainCon">
        </addNewItem>
        <itemDetail v-show="isitemDetail"
                    :itemDetail="itemDetailObj"
                    :listId="listId"
                    @close="showMainCon">
        </itemDetail>
      </div>
    </div>
  </div>
</template>
<script>
import editcoll from 'pages/main/mainCon/editCollection'
import addNewItem from 'pages/main/mainCon/addNewItem'
import itemDetail from 'pages/main/mainCon/itemDetail'
export default {
  name: 'mainContainer',
  data () {
    return {
      modalShow : false,
      isCheckAll : false, 
      modalSize : {
        height : 300,
        width : 500
      },
      listId : '',
      itemURL : '',
      itemTitle : '',
      itemDesc : '',
      itemList : [],
      showItemList : [],
      cateList : [],
      nowCate : -1,
      coverPic : '',
      collectionName : '',
      itemDetailObj : {},
      showSetIndex : null,
      addNewTip : false,
      isShowSpin : false,
      //main
      isMainCon : true,
      isEdit : false,
      isAddNewItem : false,
      isitemDetail : false,
      //bar
      isMainTopBar : true,
      isEditTopBar : false,
      isAddNewItemBar : false,
      isitemDetailBar : false,
      isEditAllShow : false
    }
  },
  mounted(){
    //左侧切换展现
    this.$root.Bus.$on('showCollectionDetail', (listItem)=>{
      if(listItem.item == null){
        this.addNewTip = true;
        return false
      }else{
        this.addNewTip = false;
        this.cateList = listItem.item.cateList;
        let id = listItem.item.collectionId;
        this.listId = id;
        this.showItems(id);
        this.collectionName = listItem.collectionName;
      }
    });
  },
  watch:{
    isCheckAll(val){
      this.itemList.forEach((item) => {
        item.flag = val;
      })
      this.filterItemlist();
    },
    //main状态，四个只允许有一个true（展示）
    isMainCon(val){
      if(val == true){
        this.isEdit = false;
        this.isAddNewItem = false;
        this.isitemDetail = false;
      }
    },
    isEdit(val){
      if(val == true){
        this.isMainCon = false;
        this.isAddNewItem = false;
        this.isitemDetail = false;
      }
    },
    isAddNewItem(val){
      if(val == true){
        this.isMainCon = false;
        this.isEdit = false;
        this.isitemDetail = false;
      }
    },
    isitemDetail(val){
      if(val == true){
        this.isMainCon = false;
        this.isEdit = false;
        this.isAddNewItem = false;
      }
    },
    //main状态，五个只允许有一个true（展示）
    isMainTopBar(val){
      if(val == true){
        this.isEditTopBar = false;
        this.isAddNewItemBar = false;
        this.isitemDetailBar = false;
        this.isEditAllShow = false;
      }
    },
    isEditTopBar(val){
      if(val == true){
        this.isMainTopBar = false;
        this.isAddNewItemBar = false;
        this.isitemDetailBar = false;
        this.isEditAllShow = false;
      }
    },
    isAddNewItemBar(val){
      if(val == true){
        this.isMainTopBar = false;
        this.isEditTopBar = false;
        this.isitemDetailBar = false;
        this.isEditAllShow = false;
      }
    },
    isitemDetailBar(val){
      if(val == true){
        this.isMainTopBar = false;
        this.isEditTopBar = false;
        this.isAddNewItemBar = false;
        this.isEditAllShow = false;
      }
    },
    isEditAllShow(val){
      if(val == true){
        this.isMainTopBar = false;
        this.isEditTopBar = false;
        this.isAddNewItemBar = false;
        this.isitemDetailBar = false;
      }
    }
  },
  methods : {
    pushItem(item,index){
      var id = item._id;
      this.itemList.forEach((item) => {
        if(item._id == id){
          let flag = item.flag;
          if(flag == true){
            item.flag = false;
          }else{
            item.flag = true;
          }
        }
      })
      this.filterItemlist();
    },
    getItemIds(){
      let ids = [];
      this.itemList.forEach((item,index) => {
        let flag = item.flag;
        let id = item._id;
        if(flag == true){
          ids.push(id);
        }
      });
      return ids;
    },
    deletItems(){
      let ids = this.getItemIds();
      let listId = this.listId;
      this.$ajax.post('/server/deleteItems', {
        ids ,
        listId
      })
      .then((response) => {
        let data = response.data;
        if(data.status == 1){
          this.showMainCon()
          this.showItems(listId);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    },
    showItems(id){
      if(this.listId == ''){
        alert("请选择或新建收藏夹");
        return false
      }
      this.isShowSpin = true;
      this.$ajax.post('/server/getItemList', {
        id : id
      })
      .then((response) => {
        var data = response.data;
        this.itemList = data.list;
        this.itemList.forEach((item) => {
          item.flag = false;
        });
        this.filterItemlist();
        this.isShowSpin = false;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    openLink(index){
      if(this.isEditAllShow == false){
        location.href = this.itemList[index].itemURL;
      }
    },
    openItemDetail(index){
      let item = this.itemList[index];
      this.itemDetailObj = item;
      this.showItemDetail()
    },
    changeCate(index){
      this.nowCate = index;
      this.showItems(this.listId);
    },
    filterItemlist(){
      let cate = this.nowCate;
      this.showItemList = [];
      if(cate == -1){
        this.showItemList = this.itemList;
      }else{
        this.itemList.forEach(item => {
          let type = item.itemType;
          if(type == cate){
            this.showItemList.push(item);
          }
        });
      }
    },
    showEditAll(){
      this.isEditAllShow = true;
    },
    showEditcoll(){
      if(this.listId == ''){
        alert("请选择或新建收藏夹");
        return false
      }
      this.isEditTopBar = true;
      this.isEdit = true;
    },
    showAddNewItem(){
      if(this.listId == ''){
        alert("请选择或新建收藏夹");
        return false
      }
      this.isAddNewItemBar = true;
      this.isAddNewItem = true;
    },
    showMainCon(){
      this.isMainTopBar = true;
      this.isMainCon = true;
    },
    showItemDetail(){
      this.isitemDetailBar = true;
      this.isitemDetail = true;
    },
    showSet(index){
      if(this.isEditAllShow == false){
        this.showSetIndex = index;
      }
    },
    hideSet(index){
      this.showSetIndex = null;
    }
  },
  components : {
    editcoll,
    addNewItem,
    itemDetail
  }
}
</script>
<style lang="scss">
.mainContainer{
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0;  
  z-index: -1;
  .mainBox{
    width: 100%;
    height: 100%;
  }
  .ConTopBar{
    height: 50px;
    border-bottom: 1px solid #ddd;
    position: relative;
    .topleft{
      margin-left: 40px;
      font-size: 16px;
      line-height: 50px;
      cursor: pointer;
    }
    .topCenterTitle{
      position: absolute;
      left: 50%;
      line-height: 50px;
      transform: translateX(-50%);
    }
    .mainTopBar{
      .myFavor{
        float: left;
        margin-left: 40px;
        font-size: 16px;
        line-height: 50px;
      }
      .editCollection{
        float: right;
        cursor: pointer;
        margin-right: 30px;
        margin-left: 40px;
        font-size: 16px;
        line-height: 50px;
      }
      .editAll{
        float: left;
        margin-left: 20px;
        margin-top: 7px;
        cursor: pointer;
        .editAllLink{
          display: inline-block;
          padding: 8px 10px;
          border: 1px solid #ddd;
          border-radius: 3px;
          &:hover{
            border: 1px solid #1ABC9C;
            color: #1ABC9C;
          }
        }
      }
    }
    .editTopBar.editAllTopBar{
      line-height: 50px;
      box-sizing: border-box;
      padding-left: 20px;
      .checkAllBox{
        margin-left: 20px;
      }
      .btn{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 65px;
        vertical-align: middle;
        margin-left: 15px;
      }
    }
  }
  .ConBody{
    padding: 10px 20px;
    height: calc(97% - 50px);
    position: relative;
    overflow: auto;
    .groupControlBar{
      height: 55px;
      line-height: 55px;
      margin-left: -5px;
      .groupList{
        .curAdr a{
          background: lightblue;
        }
        li{
          float: left;
          margin: 0 5px;
          a{
            height: 20px;
            padding:5px 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
            background: #fff;
            &:hover{
              background: lightblue;
              border: 1px solid lightblue;
            }
          }
        }
      }
      .addGroup{
        float: left;
        margin-left: 15px;
      }
      .editGroup{
        float: left;
        margin-left: 15px;
      }
    }
    .ConListConatiner{
      margin:0 -10px; 
      position: relative;
      .ConItem{
        float: left;
        width: 155px;
        height: 200px;
        margin: 10px;
        margin-bottom: 40px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        .itemMask{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 100;
          background: rgba(0, 0, 0, 0.5);
          &.selected{
            background: rgba(0, 0, 0, 0.8);
          }
          .dIcon{
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -32px;
            margin-top: -32px;
          }
        }
        .itemTitle{
          position: absolute;
          bottom: -35px;
          text-align: center;
          width: 100%;
          line-height: 35px;
        }
        &.addNewItem{
          background: #01bdd5;
          &:hover{
            background : #01a4b9; 
          }
        }
        .coverPicHolder{
          position: absolute;
          width: 155px;
          height: 200px;
          left: 0px;
          top: 0px;
        }
        &.showSet{
          .setItem{
            position: absolute;
            right: 0px;
            bottom: 0px;
            color: #fff;
            width: 100%;
            line-height: 30px;
            text-align: center;
            height: 30px;
            background: rgba(0,0,0,0.5);
            &:hover{
              background: rgba(0,0,0,0.6);
            }
          }
        }
      }
    }
  }
}
</style>
