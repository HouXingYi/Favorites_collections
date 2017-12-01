<template>
  <div class="topHeader">
    <img class="headerLogo" src="static/logo.png" alt="">
    <div class="leftNav">
      <ul class="leftNavList">
        <li class="leftNavItem"><a href="#">首页</a></li>
        <li class="leftNavItem"><a href="#">热门</a></li>
      </ul>
    </div>
    <div class="userCenter" 
         @mouseover="showUser" 
         @mouseout="hideUser" 
         :style="{background:userCenterBg}">
      <div class="userCenterInfo">{{userName}}</div>
      <ul class="userCenterDropdown" :style="{display:dropDownDis}">
        <li>个人中心</li>
        <li @click="logout">退出</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topHeader',
  props : {
    userName : {
      type : String,
      default : ''
    }
  },
  data () {
    return {
      dropDownDis : "none",
      userCenterBg : ''
    }
  },
  methods :{
    showUser(){
      this.dropDownDis = "block";
      this.userCenterBg = "#2b2f39";
    },
    hideUser(){
      this.dropDownDis = "none";
      this.userCenterBg = "";
    },
    logout(){
      let _this = this;
      this.$ajax.get('/server/logout')
      .then(function (response) {
        let data = response.data;
        let status = data.status;
        if(status == 0){
          _this.$emit('logout');
        }
      })
      .catch(function (error) {
      });
    }
  }
}
</script>
<style lang="scss">
.topHeader{
  height: 60px;
  background: #23262E;
  color: #fff;
  .headerLogo{
    width: 150px;
    height: 50px;
    margin-left: 20px;
    margin-top: -2px;
    float: left;
  }
  .leftNav{
    float: left;
    height: 60px;
    line-height: 60px;
    margin-left: 30px;
    .leftNavList{
      .leftNavItem{
        padding: 0 15px;
        float: left;
        a{
          color: #fff;
        }
      }
    }
  }
  .userCenter{
    float: right;
    text-align: center;
    margin-right: 20px;
    width: 125px;
    z-index: 100;
    position: relative;
    .userCenterInfo{
      padding: 0 10px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &:hover{
        background: #23262E;
      }
    }
    .userCenterDropdown{
      li{
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        z-index: 100;
        cursor: pointer;
        &:hover{
          background: #23262E;
        }
      }
    }
  }
}
</style>
