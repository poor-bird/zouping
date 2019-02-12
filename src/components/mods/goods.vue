<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item" v-for="item in datas.goods">
                    <span class="text">
                        <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in datas.goods" class="food-list food-list-hood">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click="xiangqingye(food)">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="description">{{food.description}}</p>
                                <div class="sell-info">
                                    <span class="sellCount">月售{{food.sellCount}}份 </span>
                                    <span class="rating">好评率{{food.rating}}</span>
                                    <div class="price">
                                        <span class="newPrice">${{food.price}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food='food'></cartcontrol>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
       <!-- 购物车 -->
        <shop-cart :food='food' :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shop-cart>
        <!-- <div class="detailWrapper"></div> -->
       <food-detail :foodDetails="foodDetails" ref="foodDetail"></food-detail>
    </div>
</template>
<script>
import icon from './icon.js'
import Scroll from 'better-scroll'
import shopCart from './shopcart'
import cartcontrol from './cartcontrol'
import foodDetail from './foodDetail'

    export default { 
        props:['datas'],
        data (){
            return{
                goods:this.datas.goods,
                icon: icon,
                foodDetails:{}
            }
        },
        computed:{
            food(){
                let arr=[];
                this.datas.goods.forEach(goods => {
                    goods.foods.forEach(foods=>{
                        if(foods.count>0){
                            arr.push(foods)
                        }
                    }) 
                });
                
                return arr;
            }
        },
        methods:{
            scroll(){
                new Scroll(this.$refs['foodsWrapper'],{
                    click:true
                })
                new Scroll(this.$refs['menuWrapper'],{
                    click:true
                })
            },
            xiangqingye(value){
                this.foodDetails = value;
                this.$refs['foodDetail'].foodshow();
                
            }

        },
        components:{
            shopCart,
            cartcontrol,
            foodDetail,
        }
    }
</script>
<style>
    
</style>