<template>
  <div class="leftBar">
    <div class="addNew" @click="showModal">新建收藏夹</div>
    <ul class="collectionsList">
      <li class="colItem" v-for="(collectionItem,index) in collectionsList" :class="{'active':index==activeIndex}">
        <a href="#" 
           :dataColId="collectionItem.collectionId"
           @click="showCollectionDetail(index)">
          {{collectionItem.collectionName}}
        </a>
      </li>
    </ul>
    <Modal v-model="modalShow" 
           :size="modalSize"
           :title="modalTitle"
           @ok="addCollection" 
           v-dom-portal>
      <div class="collectionModalBox" style="line-height:48px;">
        <span>收藏夹名字</span> <br>
        <input class="Hinput" type="text" v-model="collectionName"> <br>
        <span>描述</span> <br>
        <input class="Hinput" type="text" v-model="collectionDesc"> <br>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from 'components/modal'
export default {
  name: 'leftBar',
  data () {
    return {
      modalShow : false,
      modalSize : {
        height : 300,
        width : 500
      },
      modalTitle : '新建收藏夹',
      collectionName : '', //新建收藏夹名
      collectionDesc : '',  //新建收藏夹描述
      collectionsList : [],
      activeIndex : 0 //动态变化index
    }
  },
  mounted(){
    var _this = this;
    setTimeout(() => {
      var userName = _this.$store.state.userName;
      if(userName){
        // 获得收藏夹列表
        _this.getCollectionsList();
      }
    }, 0);
    this.$root.Bus.$on('getAllcollectionsList', ()=>{
      _this.getCollectionsList();
    });
  },
  methods :{
    addCollection(){
      var _this = this;
      if(this.collectionName == ''||this.collectionDesc == ''){
        alert("请填写完整收藏夹名和描述");
        return false
      }
      let userName = this.$store.state.userName;
      this.$ajax.post('/server/addCollection', {
        'userName': userName,
        'collectionName' : _this.collectionName,
        'collectionDesc' : _this.collectionDesc,
        'cateList' : [
            {
                cateNum : 0,
                cateName : "网站"
            },
            {
                cateNum : 1,
                cateName : "电影"
            },
            {
                cateNum : 2,
                cateName : "书籍"
            },
            {
                cateNum : 3,
                cateName : "音乐"
            }
        ]
      })
      .then(function (response) {
        var data = response.data;
        alert(data.msg);
        _this.collectionName = '';
        _this.collectionDesc = '';
        _this.getCollectionsList();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getCollectionsList(){
      var _this = this; 
      this.$ajax.get('/server/getCollections?userName='+_this.$store.state.userName)
      .then(function (response) {
        let data = response.data;
        let status = data.status;
        if(status == 1){
          let list = data.docs;
          _this.collectionsList = list;
          _this.$root.Bus.$emit('showCollectionDetail', {
            item : list[0],
            index : 0,
            collectionName : list[0].collectionName 
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    showModal(){
      this.modalShow = true;
    },
    showCollectionDetail(index){
      let collectionsItem = this.collectionsList[index];
      this.activeIndex = index;
      this.$root.Bus.$emit('showCollectionDetail', {
        item : collectionsItem,
        index : index,
        collectionName : collectionsItem.collectionName 
      });
    }
  },
  components : {
    Modal
  }
}
</script>
<style lang="scss">
.leftBar{
  position: absolute;
  width: 200px;
  border-right: 1px solid #e5e5e5;
  top: 60px;
  left: 0;
  bottom: 0;
  .addNew{
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  ul.collectionsList{
    .colItem{
      &.active{
        background: rgba(87, 173, 104, 0.18);
        color: #00ab6b;
      }
      &:hover{
        background: rgba(87, 173, 104, 0.18);
      }
      a{
        display: inline-block;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        line-height: 40px;
        padding-left: 25px;
        
      }
    }
  }
}
</style>
