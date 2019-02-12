<template>
    <div class="seller-wrapper" ref="sellerwrapper">
        <div class="seller-content">
            <div class="info">
                <div class="title">
                    <div class="text">{{datas.seller.name}}</div>
                    <div class="star-wrapper">
                        <star :size='36' :score='datas.seller.score'></star>
                        <div class="rate-count">{{datas.seller.ratingCount}}</div>
                        <div class="sell-count">{{datas.seller.sellCount}}</div>
                    </div>
                    <div class="collect" @click="show=!show">
                        <span class="icon-favorite" :class="{'active':show}"></span>
                        <span class="text">{{show?'已收藏':'收藏'}}</span>
                    </div>
                    <div class="remark">
                        <div class="block">
                            <h2>起送价</h2>
                            <div class="content">
                                <span class="num">{{datas.seller.minPrice}}</span>
                            </div>
                        </div>
                        <div class="block">
                            <h2>商家配送</h2>
                            <div class="content">
                                <span class="num">{{datas.seller.deliveryPrice}}</span>
                            </div>
                        </div>
                        <div class="block">
                            <h2>平均配送时间</h2>
                            <div class="content">
                                <span class="num">{{datas.seller.deliveryTime}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 公告和活动 -->
                    <div class="activities">
                        <div class="bulletin">
                            <h1>公告和活动</h1>
                            <div class="content">
                                {{datas.seller.bulletin}}
                            </div>
                        </div>
                    </div>
                    <div class="supports">
                        <ul>
                            <li class="item" v-for="item in datas.seller.supports">
                                <span class="iconMap" :class="icon[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="divider"></div>
                    <div class="seller-info">
                        <h1>商家信息</h1>
                        <ul class="info-list">
                            <li class="info">该商家支持发票，请下单写好发票抬头</li>
                            <li class="info">品类：其他菜系，包子粥</li>
                            <li class="info">北京昌平区回龙观大街龙观置业大厦底商B座102单元1340</li>
                            <li class="info">营业时间：10:00-20:30</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import icon from './icon.js'
import star from './star'
import Scroll from 'better-scroll'
    export default{
        props:['datas'],
        data(){
            return {
                show:false,
                icon:icon
            }
        },
        created() {
            this.$nextTick(()=>{
                    this.sc = new Scroll(this.$refs['sellerwrapper'],{
                        click:true
                    });
                })
        },
        mounted() {   
            
        },
        components:{
            star
        }
    }
</script>
<style>
    
</style>