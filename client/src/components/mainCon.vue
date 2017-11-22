<template>
  <div class="mainContainer">
    <div class="ConTopBar">
      <div class="myFavor">
        我的收藏
      </div>
      <div class="editAll">
        <a href="" class="editAllLink">批量编辑网站</a>
      </div>
    </div>
    <div class="ConBody">
      <div class="groupControlBar">
        <ul class="groupList">
          <li class="curAdr"><a href="#">全部</a></li>
          <li><a href="#">分组1</a></li>
          <li><a href="#">分组2</a></li>
          <li><a href="#">分组3</a></li>
          <li><a href="#">分组4</a></li>
        </ul>
        <div class="addGroup">添加</div>
        <div class="editGroup">编辑</div>
      </div>
      <div class="ConListConatiner clearfix">
        <ul>
          <li class="ConItem">item1</li>
          <li class="ConItem">item2</li>
          <li class="ConItem">item3</li>
          <li class="ConItem">item4</li>
          <li class="ConItem">item5</li>
          <li class="ConItem">item6</li>
          <li class="ConItem">item7</li>
          <li class="ConItem">item8</li>
          <li class="ConItem">item9</li>
          <li class="ConItem">item10</li>
          <li class="ConItem">item11</li>
          <li class="ConItem">item12</li>
          <button class="test" @click="getTest1">点击我发送GET请求</button>
          <button class="test" @click="getTest2">点击我发送POST请求</button>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'mainContainer',
  data () {
    return {
    }
  },
  methods :{
    getTest1(){
      axios.get('/test')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getTest2(){ // POST请求
      axios.post('/testPOST', {
        'firstName': 'houxingyi',
        'lastName': 'houxingyi2'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
  .ConTopBar{
    height: 50px;
    border-bottom: 1px solid #ddd;
    .myFavor{
      float: left;
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
      }
    }
  }
}
</style>
