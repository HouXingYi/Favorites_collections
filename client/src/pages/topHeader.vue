<template>
  <div class="topHeader">
    <img class="headerLogo" src="static/logo.png" alt="">
    <div class="leftNav">
      <ul class="leftNavList">
        <li class="leftNavItem"><a href="#">首页</a></li>
        <li class="leftNavItem"><a href="#">热门</a></li>
      </ul>
    </div>
    <div class="userCenter">
      <div class="userCenterInfo" >登录</div>
      <ul id="userCenterDropdown">
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topHeader',
  data () {
    return {
    }
  },
  methods :{
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
    height: 60px;
    line-height: 60px;
    width: 80px;
    text-align: center;
  }
}
</style>
