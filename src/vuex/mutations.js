export default {
    vxaddCart(state,val){
       state.vxfood.push(val)
        
    },
    vxdecreaseCart (state,food){  
        state.vxfood.forEach((value,index) => {
            if(food.count===value.name){
                value.vxfood.splice(index,1)
            }  
        });
        
    }    

}