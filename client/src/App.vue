<template>
  <div id="app">
    <topHeader></topHeader>
    <leftBar></leftBar>   
    <mainCon></mainCon>
  </div>
</template>
<script>
import topHeader from './components/topHeader.vue'
import leftBar from './components/leftBar.vue'
import mainCon from './components/mainCon.vue'
export default {
  name: 'app',
  data(){
    return {
    }
  },
  created(){
  },
  components : {
    topHeader,
    leftBar,
    mainCon
  }
}
</script>
<style lang="scss">
@import "./style/index";
#app{
  .header{
  }
  .leftBar{
  }
  .mainContainer{
  }
}
</style>
