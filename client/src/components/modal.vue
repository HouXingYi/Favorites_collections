<template>
  <div class="hModal" v-if="visible">
    <div  class="ModalCon" 
        >
        <div class="modalHeader">
            <span class="headerText">{{title}}</span>
            <div class="closeBtn" @click="closeModal">关闭</div>
        </div>
        <div class="sizeCon"
              :style="{ height: size.height + 'px', width: size.width + 'px' }">
              <slot></slot>
        </div>

        <div class="controlBox">
            <div class="Hbutton cancel" @click="closeModal">取消</div>
            <div class="Hbutton enter" @click="modalCenter">确定</div>
        </div>

    </div>
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
        default(){
            return {
                height:150,
                width:350
            }
        }
    },
    title:{
        type : String,
        default : '对话框'
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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background: rgba(0, 0, 0, 0.5); 
        z-index: 200;
        .ModalCon{
            position: fixed;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 201;
            border-radius: 5px;
            box-sizing: border-box;
            .modalHeader{
                border-bottom: 1px solid #e9eaec;
                padding: 14px 16px;
                line-height: 1;
                position: relative;
                .closeBtn{
                    position: absolute;
                    top:13px;
                    right: 15px;
                    cursor: pointer;
                    color: #C0C0C0;
                    &:hover{
                        color: #000;
                    }
                }
            }
            .controlBox{
                border-top: 1px solid #e9eaec;
                padding: 14px 16px;
                line-height: 1;
                position: relative;
                .Hbutton{
                    width: 100px;
                    display: inline-block;
                }
                .cancel{
                    margin-left: 235px;
                }
                .enter{
                    margin-left: 20px;
                }
            }
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
