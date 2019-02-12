<template>
    <div class="star star-48" :class="'star-'+size">
        <span class="star-item" :class="item" v-for="item in yimao" ></span>
    </div>
</template>
<script>
    export default {
        props:['score','size'],
        computed:{
            yimao(){
                let arr=[];
                //取整数
                let int = Math.floor(this.score);
                //取小数
                let float = (this.score - int)>=0.5;
                for (let i = 0; i < int; i++) {
                    arr.push("on")
                }
                if(float){
                    arr.push('half');
                }
                while(arr.length<5){
                    arr.push('off')
                }
                return arr;
            }
        }
    }
</script>
<style>
    
</style>