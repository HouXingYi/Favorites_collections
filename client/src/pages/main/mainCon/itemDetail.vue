<template>
    <div class="itemDetail" >

        <span>封面</span> <br>
        <img class="defaultPicHolder" :src="coverPic" alt=""> <br>

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
            itemId : '',
            coverPic : ''
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
            this.coverPic = item.coverPic;
        }
    },
    methods:{
        updateItem(){
            this.$ajax.post('/server/updateItem', {
                itemURL : this.itemURL,
                itemDesc : this.itemDesc,
                itemTitle : this.itemTitle,
                itemType : this.itemType,
                itemId : this.itemId,
                listId : this.listId
            })
            .then((response) => {
                var data = response.data;
                var status = data.status;
                if(status == 1){
                    this.$emit('close');  
                    this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deleteItem(){
            this.$ajax.post('/server/deleteItem', {
                itemId : this.itemId,
                listId : this.listId
            })
            .then((response) => {
                var data = response.data;
                var status = data.status;
                if(status == 1){
                    this.$emit('close');  
                    this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
<style lang="scss">
.itemDetail{
    line-height: 50px;
    .Hbutton{
        margin: 15px 0;
    }
}
</style>
