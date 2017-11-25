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
          <button class="test" @click="openloginModal">登录</button>
          <button class="test" @click="openModal">注册</button>
        </ul>
      </div>
    </div>
    <Modal :isShow="isShow" :size="size" @close="closeModal">
      <h1>注册</h1>
      <span>用户名</span>
      <input type="text" style="display:block;" v-model="userName">
      <span>密码</span>
      <input type="text" style="display:block;" v-model="passWord">
      <button @click="enterSignUp">确定</button>
    </Modal>
    <Modal :isShow="isloginShow" :size="size" @close="closeloginModal">
      <h1>登录</h1>
      <span>用户名</span>
      <input type="text" style="display:block;" v-model="userloginName">
      <span>密码</span>
      <input type="text" style="display:block;" v-model="loginpassWord">
      <button @click="enterlogin">确定</button>
    </Modal>
  </div>
</template>
<script>
import axios from 'axios'
import Modal from './modal'
export default {
  name: 'mainContainer',
  data () {
    return {
      isShow : false,
      isloginShow : false,
      size : {
        height:250,
        width:550
      },
      userName : '',
      passWord : '',
      userloginName:'',
      loginpassWord:''
    }
  },
  methods :{
    //登录
    enterlogin(){ 
      var _this = this;
      let userName = _this.userloginName
      let passWord = _this.loginpassWord
      if( userName == '' || passWord == '' ){
        alert("请输入密码或用户名！");
        return false
      }
      axios.post('/login', {
        'name': userName,
        'passWord': passWord
      })
      .then(function (response) {
        let data = response.data;
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    openModal(){ 
      this.isShow = true;
    },
    closeModal(){
      this.isShow = false;
    },
    openloginModal(){
      this.isloginShow = true;
    },
    closeloginModal(){
      this.isloginShow = false;
    },
    //注册
    enterSignUp(){
      var _this = this;
      let userName = _this.userName
      let passWord = _this.passWord
      if( userName == '' || passWord == '' ){
        alert("请输入密码或用户名！");
        return false
      }
      
      axios.post('/signUp', {
        'name': userName,
        'passWord': passWord
      })
      .then(function (response) {
        let data = response.data;
        if(data.singup == "success"){
          alert("注册成功!");
        }else if(data.singup == "repeat"){
          alert("已有账户!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

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
