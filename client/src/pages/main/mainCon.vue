<template>
  <div class="mainContainer">
    <div class="mainBox">
      <div class="ConTopBar">

        <div class="mainTopBar" v-show="isMainTopBar">
          <div class="myFavor topleft">
            {{collectionName}}
          </div>
          
          <!-- <div class="editAll">
            <a href="" class="editAllLink">批量编辑网站</a>
          </div> -->

          <div class="editCollection" @click="showEditcoll">
            设置收藏夹
          </div>
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
          <span class="topCenterTitle">item详情</span>
        </div>

      </div>
      <div class="ConBody">

        <!-- 分组开始 -->
        <!-- <div class="groupControlBar">
          <ul class="groupList">
            <li class="curAdr"><a href="#">全部</a></li>
            <li><a href="#">分组1</a></li>
            <li><a href="#">分组2</a></li>
            <li><a href="#">分组3</a></li>
            <li><a href="#">分组4</a></li>
          </ul>
          <div class="addGroup">添加</div>
          <div class="editGroup">编辑</div>
        </div> -->
        <!-- 分组结束 -->

        <div class="ConListConatiner clearfix" v-show="isMainCon">
          <ul>
            <!-- <li class="ConItem addNewItem" @click="showModal"></li> -->
            <li class="ConItem addNewItem" @click="showAddNewItem"></li>
            <li class="ConItem" 
                v-for="(item,index) in itemList" 
                @click="openLink(index)">
              {{item.itemTitle}}
              <span class="setItem"
                    @click.stop="openItemDetail(index)">设置</span>
            </li>
          </ul>
        </div>

        <editcoll v-show="isEdit" 
                  :cName="collectionName"
                  @close="showMainCon">
        </editcoll>
        
        <addNewItem v-show="isAddNewItem" 
                    :listId="listId"
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
      modalSize : {
        height : 300,
        width : 500
      },
      listId : '',
      itemURL : '',
      itemTitle : '',
      itemDesc : '',
      itemList : [],
      collectionName : '',
      itemDetailObj : {},

      isMainCon : true,
      isEdit : false,
      isAddNewItem : false,
      isitemDetail : false,
      
      isMainTopBar : true,
      isEditTopBar : false,
      isAddNewItemBar : false,
      isitemDetailBar : false

    }
  },
  mounted(){
    let _this = this;
    //左侧切换展现
    this.$root.Bus.$on('showCollectionDetail', (listItem)=>{
      let id = listItem.item.collectionId;
      _this.listId = id;
      _this.showItems(id);
      _this.collectionName = listItem.collectionName;
    });
  },
  methods : {
    addNewItem(){
      let _this = this;
      this.$ajax.post('/server/addNewItem', {
        id : _this.listId,
        itemURL : _this.itemURL,
        itemTitle : _this.itemTitle,
        itemDesc : _this.itemDesc
      })
      .then(function (response) {
        var data = response.data;
        if(data.status == 1){
          _this.showItems(_this.listId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    //展现数据
    showItems(id){
      let _this = this;
      this.$ajax.post('/server/getItemList', {
        id : id
      })
      .then(function (response) {
        var data = response.data;
        _this.itemList = data.list;
        // console.log(_this.itemList);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    openLink(index){
      location.href = this.itemList[index].itemURL;
    },
    openItemDetail(index){
      let item = this.itemList[index];
      this.itemDetailObj = item;
      this.showItemDetail()
    },
    showEditcoll(){
      //main
      this.isEdit = true;
      this.isAddNewItem = false;
      this.isMainCon = false;
      this.isitemDetail = false;
      //bar
      this.isEditTopBar = true;
      this.isMainTopBar = false;
      this.isAddNewItemBar = false;
      this.isitemDetailBar = false;
    },
    showAddNewItem(){
      //main
      this.isEdit = false;
      this.isAddNewItem = true;
      this.isMainCon = false;
      this.isitemDetail = false;
      //bar
      this.isEditTopBar = false;
      this.isMainTopBar = false;
      this.isAddNewItemBar = true;
      this.isitemDetailBar = false;
    },
    showMainCon(){
      //main
      this.isEdit = false;
      this.isAddNewItem = false;
      this.isMainCon = true;
      this.isitemDetail = false;
      //bar
      this.isEditTopBar = false;
      this.isMainTopBar = true;
      this.isAddNewItemBar = false;
      this.isitemDetailBar = false;
    },
    showItemDetail(){
      //main
      this.isEdit = false;
      this.isAddNewItem = false;
      this.isMainCon = false;
      this.isitemDetail = true;
      //bar
      this.isEditTopBar = false;
      this.isMainTopBar = false;
      this.isAddNewItemBar = false;
      this.isitemDetailBar = true;
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
        a{
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
    .editTopBar{

    }
  }
  .ConBody{
    padding: 10px 20px;
    .groupControlBar{
      height: 55px;
      line-height: 55px;
      margin-left: -5px;
      .groupList{
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
      .ConItem{
        float: left;
        width: 200px;
        height: 200px;
        margin: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        &.addNewItem{
          background: #123456;
        }
        .setItem{
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: #000;
          &:hover{
            color: red;
          }
        }
      }
    }
  }
}
</style>
