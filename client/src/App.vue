<template>
  <div id="app">
    <login v-if="!islogin" @logined="handleLogin"></login>
    <topHeader v-if="islogin" :userName="userName" @logout="handleLogout"></topHeader>
    <leftBar v-if="islogin"></leftBar>   
    <mainCon v-if="islogin"></mainCon>
  </div>
</template>
<script>
import topHeader from './pages/topHeader.vue'
import leftBar from './pages/leftBar.vue'
import mainCon from './pages/mainCon.vue'
import login from './pages/login.vue'
export default {
  name: 'app',
  data(){
    return {
      islogin : false,
      userName : ''
    }
  },
  mounted(){
    let _this = this;
    _this.$nextTick(function () {
      _this.$ajax.get('/server/checkLogin')
      .then(function (response) {
        let data = response.data;
        let name = data.name;
        let sta = data.status;
        if(sta == 0){
          _this.islogin = false;
          _this.userName = '';
        }else if(sta == 1){
          _this.islogin = true;
          _this.userName = name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  },
  methods:{
    handleLogin(){
      this.islogin = true;
    },
    handleLogout(){
      this.islogin = false;
    }
  },
  components : {
    topHeader,
    leftBar,
    mainCon,
    login
  }
}
</script>
<style lang="scss">
@import "./style/index";
</style>
