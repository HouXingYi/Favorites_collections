<template>
  <div class="mainContainer">
    <div class="mainBox" v-if="!isEdit&&!isAddNewItem">

      <div class="ConTopBar">
        <div class="myFavor">
          {{collectionName}}
        </div>

        <!-- <div class="editAll">
          <a href="" class="editAllLink">批量编辑网站</a>
        </div> -->

        <div class="editCollection" @click="isEdit = true">

          设置收藏夹

        </div>

      </div>

      <div class="ConBody">

        <!-- 分组，后面再开发 -->
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

        <div class="ConListConatiner clearfix">
          <ul>

            <!-- <li class="ConItem addNewItem" @click="showModal"></li> -->
            <li class="ConItem addNewItem" @click="isAddNewItem = true"></li>

            <li class="ConItem" v-for="(item,index) in itemList" @click="jumpLink(index)">
              {{item.itemTitle}}
            </li>

          </ul>
        </div>

      </div>

    </div>
    

    <!-- 设置收藏夹start -->
    <div class="editBox" v-if="isEdit">
      <span @click="isEdit = false" style="cursor:pointer;">返回</span> <br>
      edit
    </div>
    <!-- 设置收藏夹end -->

    <!-- 添加新收藏start -->
    <div class="AddNewItemBox" v-if="isAddNewItem">
      <span @click="isAddNewItem = false" style="cursor:pointer;">返回</span> <br>
            
      <span>(重点)搜索</span> <br>

      <label><input name="Fruit" type="radio" value="" />电影</label> 
      <label><input name="Fruit" type="radio" value="" />书籍</label> 
      <label><input name="Fruit" type="radio" value="" />音乐</label> 

      <br>
      <input class="Hinput" 
             style="width:500px;"
             type="text"> <br>


      <span>网址</span> <br>
      <input class="Hinput" 
             style="width:500px;"
             type="text" v-model="itemURL"> <br>


      <span>标题</span> <br>
      <input class="Hinput" 
             style="width:500px;"
             type="text" v-model="itemTitle"> <br>


      <span>描述</span> <br>
      <input class="Hinput" 
             style="width:500px;"
             type="text" v-model="itemDesc"> <br>

    </div>
    <!-- 添加新收藏end -->

    <Modal v-model="modalShow" :size="modalSize" @ok="addNewItem" v-dom-portal>
      <div class="collectionModalBox" style="line-height:48px;">
        <span>网址</span> <br>
        <input class="Hinput" type="text" v-model="itemURL"> <br>
        <span>标题</span> <br>
        <input class="Hinput" type="text" v-model="itemTitle"> <br>
        <span>描述</span> <br>
        <input class="Hinput" type="text" v-model="itemDesc"> <br>
      </div>
    </Modal>

  </div>
</template>
<script>
import Modal from 'components/modal'
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
      isEdit : false,
      isAddNewItem : false
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
    showModal(){
      this.modalShow = true;
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
    jumpLink(index){
      let link = this.itemList[index].itemURL;
      window.location.href = link;
    }
  },
  components : {
    Modal
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
        &.addNewItem{
          background: #123456;
        }
      }
    }
  }
}
</style>
