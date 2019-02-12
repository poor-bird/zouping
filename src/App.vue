<template>
    <div id="app">
        <v-header :seller = 'datas.seller'></v-header>
        <div class="tab">
            <div class="tab-item">
                <router-link to='/goods'>商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/ratings'>评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to='/seller'>商家</router-link>
            </div>
        </div>
        <!-- 把加载过的组件缓存起来 -->
        <keep-alive>
            <router-view :datas='datas' ref="abc"/>
        </keep-alive>
        
    </div>
</template>

<script>
import vHeader from "./components/mods/header"
import Axios from 'axios'
export default {
    data(){
        return {
            datas:{
                //商户信息
                seller:{},
                //商品数据
                goods:[],
                //客户评论
                ratings:[]
            }
        }
    },
    name: "App",
    mounted () {
        Axios.get('/static/data.json').then((res)=>{           
            this.datas.seller = res.data.seller;
            this.datas.goods = res.data.goods;
            this.datas.ratings = res.data.ratings;
            this.$nextTick(()=>{
                this.$refs.abc.scroll()
                console.log(this)
            })
        })
    },
    components: {
        vHeader
    }
};
</script>

<style>
.tab .tab-item a.router-link-active{
    color: red
}    
</style>
