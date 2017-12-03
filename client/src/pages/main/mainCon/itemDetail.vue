<template>
    <div class="itemDetail" >
        <span>网址</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text" 
            v-model="itemURL"> <br>
        <span>标题</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text" 
            v-model="itemTitle"> <br>
        <span>类型</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text" 
            v-model="itemType"> <br>
        <span>描述</span> <br>
        <textarea rows="5" cols="30"
                  class="Hinput" 
                  style="width:500px;height:auto;"
                  type="text" 
                  v-model="itemDesc" ></textarea>
        <br>
        <div class="Hbutton" style="width:100px;" @click="updateItem">
            保存
        </div>
        <div class="Hbutton" 
             style="width:100px;background:red;"
             @click="deleteItem">
            删除
        </div>
    </div>
</template>
<script>
export default {
    name: 'itemDetail',
    data(){
        return {
            itemURL : '',
            itemDesc : '',
            itemTitle : '',
            itemType : '',
            itemId : ''
        }
    },
    props:{
        itemDetail : {
            type : Object,
            default : {}
        },
        listId : {
            type : String,
            default : ''
        }
    },
    watch : {
        itemDetail(item){
            //手动赋值
            this.itemURL = item.itemURL;
            this.itemDesc = item.itemDesc;
            this.itemTitle = item.itemTitle;
            this.itemType = item.itemType;
            this.itemId = item._id;
        }
    },
    methods:{
        updateItem(){
            var _this = this;
            this.$ajax.post('/server/updateItem', {
                itemURL : _this.itemURL,
                itemDesc : _this.itemDesc,
                itemTitle : _this.itemTitle,
                itemType : _this.itemType,
                itemId : _this.itemId,
                listId : _this.listId
            })
            .then(function (response) {
                var data = response.data;
                var status = data.status;
                if(status == 1){
                    _this.$emit('close');  
                    _this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteItem(){
            var _this = this;
            this.$ajax.post('/server/deleteItem', {
                itemId : _this.itemId,
                listId : _this.listId
            })
            .then(function (response) {
                var data = response.data;
                var status = data.status;
                if(status == 1){
                    _this.$emit('close');  
                    _this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
<style lang="scss">
</style>
