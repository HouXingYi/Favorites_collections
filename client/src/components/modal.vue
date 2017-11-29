<template>
  <div class="hModal" v-if="visible">
      <div  class="ModalCon" 
            :style="{ height: size.height + 'px', width: size.width + 'px' }">
          <slot></slot>
          <button @click="modalCenter">确定</button>
      </div>
      <div class="closeBtn" @click="closeModal">关闭</div>
      <div class="hModalMask"></div>
  </div>
</template>
<script>
export default {
  name: 'modal',
  props :{
    value : {
        type : Boolean,
        default : false
    },
    size : {
        type : Object,
        default : {}
    }
  },
  data () {
    return {
        visible : this.value
    }
  },
  watch : {
    value (val) {
        this.visible = val;
    }
  },
  methods :{
    closeModal(){
        this.visible = false;
        this.$emit('input', false); //这个非常重要，通过emit一个input事件来更新v-model数据 
    },
    modalCenter(){
        this.visible = false;
        this.$emit('input', false); //这个非常重要，通过emit一个input事件来更新v-model数据 
        this.$emit('ok', false); 
    }
  }
}
</script>
<style lang="scss">
    .hModal{
        .ModalCon{
            position: fixed;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 201;
        }
        .closeBtn{
            position: fixed;
            color: #fff;
            top: 30px;
            right: 30px;
            z-index: 201;
            font-size: 32px;
            cursor: pointer;
        }
        .hModalMask{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5); 
            z-index: 200;
        }
    }
</style>
