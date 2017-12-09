<template>
  <div class="spin" v-show="showSpin">
    <div class="line-scale-pulse-out">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'spin',
  props :{
    showSpin : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
    }
  },
  watch : {
  },
  methods :{
  }
}
</script>
<style lang="scss">
.spin{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99998;
    background: rgba(255,255,255,0.9);
    .line-scale-pulse-out{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -35px;
        margin-top: -22px;
        z-index: 99999;
    }
}
.line-scale-pulse-out {
  transform: scale(1);
  width: 70px;
  height: 43px;
}
.line-scale-pulse-out > div {
  background-color: #11D4C5;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: line-scale-pulse-out 0.9s -0.60s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
  animation: line-scale-pulse-out 0.9s -0.60s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
}
.line-scale-pulse-out > div:nth-child(2), .line-scale-pulse-out > div:nth-child(4) {
  -webkit-animation-delay: -0.4s !important;
  animation-delay: -0.4s !important;
}
.line-scale-pulse-out > div:nth-child(1), .line-scale-pulse-out > div:nth-child(5) {
  -webkit-animation-delay: -0.2s !important;
  animation-delay: -0.2s !important;
}
@-webkit-keyframes line-scale-pulse-out {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }
  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  }
  @keyframes line-scale-pulse-out {
    0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }
  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}
  
</style>
