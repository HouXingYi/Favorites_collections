<template>
  <div class="login">
    <img src="static/login.jpg" alt="" class="loginBg">
    <div class="loginBox">
      <div class="indexTabNav">
        <span class="signUp tabItem " 
              :class="{cur:isShowSignUp}" 
              @click="showSignUp">注册</span>
        <span class="login tabItem" 
              :class="{cur:isShowLogin}"
              @click="showLogin">登录</span>
      </div>
      <div class="signUpCon" v-if="isShowSignUp">
        <input class="Hinput" type="text" placeholder="账号"
               v-model="signUpUserName" >
        <input class="Hinput" type="text" placeholder="密码"
               v-model="signPassWord" >
        <button class="Hbutton" style="width:100%;" @click="signUp">注册</button>
      </div>
      <div class="loginCon" v-if="isShowLogin">
        <input class="Hinput" type="text" placeholder="账号"
               v-model="loginUserName" >
        <input class="Hinput" type="text" placeholder="密码"
               v-model="loginPassWord" >
        <button class="Hbutton" style="width:100%;" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      isShowSignUp : true,
      isShowLogin : false,
      signUpUserName : '',
      signPassWord : '',
      loginUserName : '',
      loginPassWord : ''
    }
  },
  methods :{
    signUp(){
      let _this = this;
      let userName = _this.signUpUserName
      let passWord = _this.signPassWord
      if( userName == '' || passWord == '' ){
        alert("请输入密码或用户名！");
        return false
      }
      this.$ajax.post('/server/signUp', {
        'name': userName,
        'passWord': passWord
      })
      .then(function (response) {
        let data = response.data;
        let status = data.status;
        let msg = data.msg;
        if(status == 0){//重复注册
          alert(msg);
          _this.signUpUserName = '';
          _this.signPassWord = '';
        }else if(status == 1){//注册成功
          alert(msg);
          _this.showLogin();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    login(){
      var _this = this;
      let userName = _this.loginUserName
      let passWord = _this.loginPassWord
      if( userName == '' || passWord == '' ){
        alert("请输入密码或用户名！");
        return false
      }
      this.$ajax.post('/server/login', {
        'name': userName,
        'passWord': passWord
      })
      .then(function (response) {
        let data = response.data;
        let status = data.status;
        let msg = data.msg;
        if(status == -1){//不存在该账户
          alert(msg);
        }else if(status == 0){//密码错误
          alert(msg);
        }else if(status == 1){//密码正确
          _this.$emit('logined');          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    showSignUp(){
      this.isShowSignUp = true;
      this.isShowLogin = false;
    },
    showLogin(){
      this.isShowLogin = true;
      this.isShowSignUp = false;  
    }
  }
}
</script>
<style lang="scss">
.login{
  .loginBg{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .loginBox{
    width: 300px;
    background: #fff;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
    .indexTabNav{
      height: 48px;
      text-align: center;
      .tabItem{
        margin: 0px 10px;
        cursor: pointer;
        display: inline-block;
        line-height: 40px;
        height: 40px;
        &.cur{
          color: #0f88eb;
          border-bottom: 2px solid #0f88eb;
        }
      }
    }
  }
}
</style>
