<template>
  <div id="app">
    <transition name="fade">
      <login v-if="!islogin" @logined="handleLogin"></login>
    </transition>
    <transition name="fade">
      <topHeader v-if="islogin" :userName="userName" @logout="handleLogout"></topHeader>
    </transition>
    <transition name="fade">
      <leftBar v-if="islogin"></leftBar>   
    </transition>
    <transition name="fade">
      <mainCon v-if="islogin"></mainCon>
    </transition>
  </div>
</template>
<script>
import topHeader from 'pages/main/topHeader.vue'
import leftBar from 'pages/main/leftBar.vue'
import mainCon from 'pages/main/mainCon.vue'
import login from 'pages/login/login.vue'
export default {
  name: 'app',
  data(){
    return {
      islogin : true,
      userName : ''
    }
  },
  mounted(){
    this.$nextTick( () => {
      this.$ajax.get('/server/checkLogin')
      .then((response) => {
        let data = response.data;
        let name = data.name;
        let sta = data.status;
        if(sta == 0){
          this.islogin = false;
          this.userName = '';
          this.$store.commit("updateUserInfo","");
        }else if(sta == 1){
          this.islogin = true;
          this.userName = name;
          this.$store.commit("updateUserInfo",name);
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
