<template>
    <div class="editBox" @keydown="enterChange($event)">
        <span >修改名称</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text"
            v-model="changeName"> <br>
        <span>修改简介</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text" 
            v-model="changeDesc" > <br>
        <div class="Hbutton" style="width:100px;"
             @click="enterChange">确认修改</div>
        <div class="Hbutton" 
             style="width:100px;background:red;"
             @click="deleteColl">解散收藏夹</div>
    </div>
</template>
<script>
export default {
    name: 'editColl',
    data(){
        return {
            changeName : '',
            changeDesc : ''
        }
    },
    props:{
        cName :String
    },
    mounted(){
        let userName = this.$store.state.userName;
        let cName = this.cName;
        this.$ajax.get(`/server/getCollectionByName?userName=${userName}&cName=${cName}`)
        .then((response) => {
            var data = response.data;
            this.changeName = data.doc.collectionName;
            this.changeDesc = data.doc.collectionDesc;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    methods:{
        enterChange(e){
            let evnetType = e.type;
            if(evnetType == "keydown"){
                let keyCode = e.keyCode;
                if(keyCode != 13){
                    return false
                }
            }
            if(this.changeName == '' ){
                alert("收藏夹名不可为空");
                return false
            }
            this.$ajax.post('/server/upDateCollection', {
                'userName':this.$store.state.userName,
                'oldCollectionName': this.cName,
                'newCollectionName': this.changeName,
                'newCollectionDesc': this.changeDesc
            })
            .then((response) => {
                var data = response.data;
                var status = data.status;
                if( status == 1 ){
                    this.$emit('close');  
                    this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deleteColl(){
            let userName = this.$store.state.userName;
            let cName = this.cName;
            this.$ajax.get(`/server/deleteCollection?userName=${userName}&cName=${cName}`)
            .then((response) => {
                var data = response.data;
                var status = data.status;
                if( status == 1 ){
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
.editBox{
    line-height: 50px;
    .Hbutton{
        margin: 15px 0;
    }
}
</style>
