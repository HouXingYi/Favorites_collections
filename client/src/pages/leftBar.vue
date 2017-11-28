<template>
  <div class="leftBar">
    <div class="addNew" @click="addCollection">新建收藏夹</div>
    <ul class="collectionsList">
      <!-- <li class="colItem"><a href="#">收藏夹1</a></li> -->
      <!-- <li class="colItem"><a href="#">收藏夹2</a></li> -->
      <!-- <li class="colItem"><a href="#">收藏夹3</a></li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'leftBar',
  data () {
    return {
    }
  },
  mounted(){

    this.$ajax.get('/server/getCollections')
    .then(function (response) {
      var data = response.data;

      console.log(data);

    })
    .catch(function (error) {
      console.log(error);
    });
    
  },
  methods :{
    addCollection(){
      let userName = this.$store.state.userName;
      this.$ajax.post('/server/addCollection', {
        'userName': userName
      })
      .then(function (response) {
        var data = response.data;

        console.log(data);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
