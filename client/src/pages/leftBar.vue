<template>
  <div class="leftBar">
    <div class="addNew" @click="showModal">新建收藏夹</div>
    <ul class="collectionsList">
      <li class="colItem" v-for="(collectionItem,index) in collectionsList" >
        <a href="#" 
           :dataColId="collectionItem.collectionId"
           @click="showCollectionDetail(index)">
          {{collectionItem.collectionName}}
        </a>
      </li>
    </ul>
    <Modal v-model="modalShow" :size="modalSize" @ok="addCollection">
      <div class="collectionModalBox">
        <span>收藏夹名字</span> <br>
        <input type="text" v-model="collectionName"> <br>
        <span>描述</span> <br>
        <input type="text" v-model="collectionDesc"> <br>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '../components/modal'
export default {
  name: 'leftBar',
  data () {
    return {
      modalShow : false,
      modalSize : {
        height : 300,
        width : 500
      },
      collectionName : '', //新建收藏夹名
      collectionDesc : '',  //新建收藏夹描述
      collectionsList : []
    }
  },
  mounted(){
    var _this = this;
    // 获得收藏夹列表
    this.getCollectionsList();
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
        'collectionDesc' : _this.collectionDesc
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
      this.$ajax.get('/server/getCollections')
      .then(function (response) {
        let data = response.data;
        let status = data.status;
        if(status == 1){
          let list = data.docs;
          console.log(list);
          _this.collectionsList = list;
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
      let id = this.collectionsList[index].collectionId;
      this.$root.Bus.$emit('showCollectionDetail', id);
    }
  },
  components : {
    Modal
  }
}
</script>
<style lang="scss">
.leftBar{
  position: fixed;
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
      a{
        display: inline-block;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        line-height: 40px;
        padding-left: 25px;
        &:hover{
          background: #f5f5f5;
        }
      }
    }
  }
}
</style>
