<template>
  <div id="app">
    <div class="header"></div>
    <div class="leftBar"></div>    
    <div class="mainContainer">
      main
    </div> 
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./style/index";

#app{

  .header{
    height: 60px;
    background: #23262E;
  }
  .leftBar{
    position: fixed;
    width: 200px;
    border-right: 1px solid #e5e5e5;
    background: #123456;
    top: 60px;
    left: 0;
    bottom: 0;
  }
  .mainContainer{
    position: absolute;
    background: lightcoral;
    top: 60px;
    left: 200px;
    right: 0;
    bottom: 0;
  }
}

</style>
