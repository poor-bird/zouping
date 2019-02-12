<template>
    <div ref='ratingsWrapper' class="ratingsWrapper">
        <div class="ratings-content">
            <!-- 评分信息 -->
            <div class="info">
                <div class="mark">
                    <div class="num">{{datas.seller.score}}</div>
                    <div class="text">综合评分</div>
                    <div class="contrastt">{{datas.seller.rankRate}}</div>
                </div>
                <div class="stars">
                    <div class="serviceScore">
                        <span class="text">服务态度</span>
                        <star :size='36 ' :score='datas.seller.serviceScore'></star>
                        <span class="num">{{datas.seller.serviceScore}}</span>
                    </div>
                    <div class="foodScore">
                        <span class="text">商品评分</span>
                        <star :size='36 ' :score='datas.seller.serviceScore'></star>
                        <span class="num">{{datas.seller.serviceScore}}</span>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="evaluation">
                <div class="classify">
                    <span class="item" v-for="(item,index) in classify" :class="{'active':item.active,'bad':index===2,'badActive':item.active&&index===2}" @click="evel(item)">
                        {{item.name}}
                        <span class="count" >{{item.count}}</span>
                    </span>
                </div>
                <div class="switch" @click="show=!show">
                    <span class="icon-check_circle" :class="{'on':show}"></span>
                    <span class="text">只看有内容评价</span>
                </div>
                <div class="evel-list">
                    <ul>
                        <li class="evel" v-for="(item, index) in comment" :key="index">
                            <div class="avatar">
                                <img height="28" width="28" :src="item.avatar" alt="">
                            </div>
                            <div class="content">
                                <div class="user">
                                    <span class="name">{{item.username}}</span>
                                    <span class="rateTime">{{item.rateTime}}</span>
                                </div>
                                <div class="star-wrapper">
                                    <star :size='24' :score='item.score' ></star>
                                    <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
                                </div>
                                <div class="text">{{item.text}}</div>
                                <div class="recommend">
                                    <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-up'"></span>
                                    <span class="dish" v-for="(dish, index) in item.recommend" :key="index">{{dish}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import star from './star'
import Scroll from 'better-scroll'
    export default { 
        props:['datas'],
        data(){
            return{
                ratings:[],
                classify:[
                    {name:'全部',active:true,count:0,comment:[]},
                    {name:'推荐',active:false,count:0,comment:[]},
                    {name:'吐槽',active:false,count:0,comment:[]}
                ],
                show:true,
                //用来保存每次点击下的评论  
                comments:[]
            }
        },
        mounted() {
            axios.get('../../static/data.json').then(res=>{
                this.ratings = res.data.ratings
                this.ratings.forEach(val => {
                    this.classify[0].count++;
                    this.classify[0].comment.push(val);
                    if(val.rateType){
                        this.classify[2].count++;
                        this.classify[2].comment.push(val);
                    }else{
                        this.classify[1].count++;
                        this.classify[1].comment.push(val);
                    }
                
                });
                this.$nextTick(()=>{
                    this.sc = new Scroll(this.$refs['ratingsWrapper'],{
                        click:true
                    });
                })
            })
        },
        activated() {
            //有没有缓存都会被执行
           
            
        },
        methods:{
            evel(item){
                this.comments = item.comment
                this.classify.forEach(val=>{
                    val.active = false
                })
                
                item.active=true
            }
        },
        computed:{
            comment(){

                if (this.show) {
                    //吧if筛选出来的数据保存起来
                    let arr=[];
                    this.comments.forEach(val=>{
                        if(val.text.length>0){
                            arr.push(val)
                        }
                    })
                    return arr
                }else{
                    //看全部评价
                    return this.comments
                }
            }
        },
        components:{
            star
        }
    }
</script>
<style>

</style>