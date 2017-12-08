<template>
    <div class="AddNewItemBox" >

        <span>分类</span> <br>

        <div class="cateBox">
            <label v-for="(cateItem,index) in cateList">
                <input name="Fruit" type="radio" :value="cateItem.cateNum" v-model="cate" />
                {{cateItem.cateName}}
            </label> 
        </div>

        <div class="searchBox" v-if="isSearchShow">
            <span>搜索</span> <br>
            <input class="Hinput" 
                   style="width:500px;"
                   type="text"
                   v-model="qText"> <br>
            <div class="Hbutton searchBtn" @click="searchDouBan">搜索</div>
        </div>

        <div class="searchResult" v-if="isSearchShow">
            <ul>
                <li class="resultItem" 
                    v-for="(item,index) in searchRlist" 
                    @click="chooseItem(index)">
                    {{item.title}}
                </li>
            </ul>
        </div>


        <div class="infoBox">

            <div class="infoCover">
                <span>封面</span> <br>
                <img class="defaultPicHolder" :src="coverPic" alt="">
                <!-- <label for="defaultPic" class="upLoadPicLabel">
                    点击上传图片
                    <input id="defaultPic" type="file" >
                </label> <br> -->
            </div>

            <div class="infoUrlString">
                <span>网址</span> <br>
                <input class="Hinput" 
                    style="width:500px;"
                    type="text" 
                    v-model="itemURL"> 
            </div>
            
            <div class="infoTitle">
                <span>标题</span> <br>
                <input class="Hinput" 
                    style="width:500px;"
                    type="text" 
                    v-model="itemTitle"> 
            </div>

            <div class="desc">
                <span>描述</span> <br>
                <textarea rows="5" cols="30"
                        class="Hinput" 
                        style="width:500px;height:auto;"
                        type="text" 
                        v-model="itemDesc" ></textarea>
            </div>
            
        </div>

        <div class="Hbutton" style="width:100px;" @click="addNewItemEnter">确认</div>

    </div>
</template>
<script>
export default {
    data(){
        return {
            //分类
            cate : 0,
            //信息
            itemURL : '',
            itemTitle : '',
            itemDesc : '',
            qText : '', //搜索关键字
            searchRlist : [],
            coverPic : 'static/default.png'
        }
    },
    props:{
        listId : '',
        cateList : {
            type : Array,
            default : []
        }
    },
    computed:{
        isSearchShow(){
            if(this.cate !== 0){
                return true
            }else{
                return false
            }
        }
    },
    watch: {
        cate(val){
            //重置
            this.itemURL = '';
            this.itemTitle = '';
            this.itemDesc = '';
            this.qText = '';
            this.searchRlist = [];
            this.coverPic = 'static/default.png';
        }
    },
    methods:{
        addNewItemEnter(){
            this.$ajax.post('/server/addNewItem', {
                id : this.listId,
                itemURL : this.itemURL,
                itemTitle : this.itemTitle,
                itemDesc : this.itemDesc,
                itemType : parseInt(this.cate),
                coverPic : this.coverPic
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
        searchDouBan(){
            let movieSearch = 'https://api.douban.com/v2/movie/search?q=';
            let bookSearch = 'https://api.douban.com/v2/book/search?q=';
            let musicSearch = 'https://api.douban.com/v2/music/search?q=';
            let searchUrl = '';
            if(this.cate == '1'){ //电影
                searchUrl = movieSearch + this.qText;
            }else if(this.cate == '2'){ //书籍
                searchUrl = bookSearch + this.qText;
            }else if(this.cate == '3'){ //音乐
                searchUrl = musicSearch + this.qText;
            }
            this.$ajax.jsonp(searchUrl,(err,data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    if(this.cate == '1'){ //电影
                        this.searchRlist = data.subjects;
                    }else if(_this.cate == '2'){ //书籍
                        this.searchRlist = data.books;
                    }else if(_this.cate == '3'){ //音乐
                        this.searchRlist = data.musics;
                    }
                }
            })
        },
        chooseItem(index){
            let item = this.searchRlist[index];
            let id = item.id;
            let movieDetail = 'https://api.douban.com/v2/movie/subject/'+id;
            let bookDetail = 'https://api.douban.com/v2/book/'+id;
            let musicDetail = 'https://api.douban.com/v2/music/'+id;
            let detailUrl = '';
            if(this.cate == '1'){ //电影
                detailUrl = movieDetail;
            }else if(this.cate == '2'){ //书籍
                detailUrl = bookDetail;
            }else if(this.cate == '3'){ //音乐
                detailUrl = musicDetail;
            }
            this.$ajax.jsonp(detailUrl,(err,data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    if(this.cate == '1'){ //电影
                        this.itemDesc = data.summary; 
                        this.coverPic = item.images.large;
                    }else if(this.cate == '2'){ //书籍
                        this.itemDesc = data.summary; 
                        this.coverPic = item.images.large;
                    }else if(_this.cate == '3'){ //音乐
                        this.itemDesc = data.summary; 
                        this.coverPic = item.image;
                    }
                    this.itemURL = item.alt; 
                    this.itemTitle = item.title; 
                }
            })
        }
    }
}
</script>
<style lang="scss">

    .AddNewItemBox{
        line-height: 30px;
        .Hbutton{
            margin: 20px 0;
            width:100px;
        }
        .defaultPicHolder{
            height: 200px;
            width: 150px;
        }
        .upLoadPicLabel{
            input{
                display: none;
            }
        }
        .searchResult{
            margin: 20px 20px;
            .resultItem{
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                padding-left: 20px;
                &:hover{
                    background: #eee;
                }
            }
        }
    }
    
</style>
