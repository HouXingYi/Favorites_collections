<template>
    <div class="AddNewItemBox" >
        <span>分类</span> <br>

        <label v-for="(cateItem,index) in cateList">
            <input name="Fruit" type="radio" :value="cateItem.cateNum" v-model="cate" />
            {{cateItem.cateName}}
        </label> 

        <!-- <label><input name="Fruit" type="radio" value="1" v-model="cate" />电影</label>  -->
        <!-- <label><input name="Fruit" type="radio" value="2" v-model="cate" />书籍</label>  -->
        <!-- <label><input name="Fruit" type="radio" value="3" v-model="cate" />音乐</label> -->

        <br>
        <div class="searchBox" v-if="isSearchShow">
            <span>搜索</span> <br>
            <input class="Hinput" 
                   style="width:500px;"
                   type="text"
                   v-model="qText"> <br>
            <div class="Hbutton" style="width:100px;" @click="searchDouBan">搜索</div>
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
        <span>封面</span> <br>
        <img class="defaultPicHolder" :src="coverPic" alt=""> <br>

        <!-- 先不做 -->
        <!-- <label for="defaultPic" class="upLoadPicLabel">
            点击上传图片
            <input id="defaultPic" type="file" >
        </label> <br> -->

        <span>描述</span> <br>
        <textarea rows="5" cols="30"
                  class="Hinput" 
                  style="width:500px;height:auto;"
                  type="text" 
                  v-model="itemDesc" ></textarea>
        <br>
        <div class="Hbutton" style="width:100px;" @click="addNewItemEnter">确认</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            cate : 0,
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
    methods:{
        addNewItemEnter(){
            let _this = this;
            this.$ajax.post('/server/addNewItem', {
                id : _this.listId,
                itemURL : _this.itemURL,
                itemTitle : _this.itemTitle,
                itemDesc : _this.itemDesc,
                itemType : parseInt(_this.cate),
                coverPic : _this.coverPic
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
        searchDouBan(){
            let _this = this;
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
            this.$ajax.jsonp(searchUrl,function(err,data){
                if (err) {
                    console.error(err.message);
                } else {
                    if(_this.cate == '1'){ //电影
                        _this.searchRlist = data.subjects;
                    }else if(_this.cate == '2'){ //书籍
                        _this.searchRlist = data.books;
                    }else if(_this.cate == '3'){ //音乐
                        _this.searchRlist = data.musics;
                    }
                }
            })
        },
        chooseItem(index){
            let _this = this;
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
            this.$ajax.jsonp(detailUrl,function(err,data){
                if (err) {
                    console.error(err.message);
                } else {
                    if(_this.cate == '1'){ //电影
                        _this.itemDesc = data.summary; 
                        _this.coverPic = item.images.large;
                    }else if(_this.cate == '2'){ //书籍
                        _this.itemDesc = data.summary; 
                        _this.coverPic = item.images.large;
                    }else if(_this.cate == '3'){ //音乐
                        _this.itemDesc = data.summary; 
                        _this.coverPic = item.image;
                    }
                    console.log(item);
                    _this.itemURL = item.alt; 
                    _this.itemTitle = item.title; 
                }
            })
        }
    }
}
</script>
<style lang="scss">
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
</style>
