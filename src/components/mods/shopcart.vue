<template>
    <div class="shopCart">
        <div @click="showa" class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo active">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="badge" v-show="totalPrice">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
                <div class="desc" v-show="totalPrice<this.minPrice">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{'enougt': totalPrice > minPrice}">
                <div class="pay">{{payDesc}}</div>
            </div>
        </div>
        <transition name="transHeight">   
            <div v-show="totalPrice > 0 && show" class="shopcart-list">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span @click="empty" class="empty">清空</span>
                </div>
                <div ref="listcontent" class="list-content">
                    <ul>
                        <li class="food" v-for="item in food">
                            <span class="name">{{item.name}}</span>
                            <div class="price">
                                <span>￥{{item.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food='item'></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Scroll from 'better-scroll';
import cartcontrol from "./cartcontrol";
    export default {
    //配送费         起步价     数量大于0的商品
        props: ["deliveryPrice", "minPrice", "food"],
        data (){
            return {
                show:false
            }
        },
        computed: {
            //总价格
            totalPrice() {
            let total = 0;
            this.food.forEach(food => {
                total += food.price * food.count;
                // console.log(this)
            });
            if (total < this.minPrice && total != 0) {
                total += this.deliveryPrice;
            }
            return total;
            },
            totalCount() {
            let count = 0;
            this.food.forEach(food => {
                count += food.count;
            });
            return count;
            },
            payDesc() {
            if (this.totalPrice == 0) {
                return `￥${this.minPrice}起送`;
            } else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}起送`;
            } else {
                return `去结算`;
            }
            }
        },
        methods:{
            empty(){
                this.food.forEach(val=>{
                    val.count=0
                })
                this.show = false
            },
            showa () {
                this.show = !this.show;
                this.$nextTick(()=>{
                    if(this.sc){
                        this.sc = new Scroll(this.$refs['listcontent'],{
                            click:true
                        })
                    }else{
                        //强制重新计算高度
                        this.sc.refresh();
                    }
                    
                });
               

            }
        },
        components: {
            cartcontrol
        }
    };
</script>
<style scoped>
    .shopCart{left: 0}
    .shopCart .content .enougt {
        background-color: green;
        color: white;
    }
</style>
