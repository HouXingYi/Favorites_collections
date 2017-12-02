<template>
    <div class="editBox" >
        <span>修改名称</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text"
            v-model="changeName"> <br>
        <span>修改简介</span> <br>
        <input class="Hinput" 
            style="width:500px;"
            type="text" 
            v-model="changeDesc"> <br>
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
    },
    methods:{

        enterChange(){
            let _this = this;
            if(this.changeName == '' ){
                alert("收藏夹名不可为空");
                return false
            }
            this.$ajax.post('/server/upDateCollection', {
                'userName':_this.$store.state.userName,
                'oldCollectionName': _this.cName,
                'newCollectionName': _this.changeName,
                'newCollectionDesc': _this.changeDesc
            })
            .then(function (response) {
                var data = response.data;
                var status = data.status;
                if( status == 1 ){
                    _this.$emit('close');  
                    _this.$root.Bus.$emit('getAllcollectionsList');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteColl(){
            let _this = this;
            let userName = this.$store.state.userName;
            let cName = this.cName;
            this.$ajax.get(`/server/deleteCollection?userName=${userName}&cName=${cName}`)
            .then(function (response) {
                var data = response.data;
                var status = data.status;
                if( status == 1 ){
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
