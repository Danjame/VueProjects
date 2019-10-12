<style lang="less" scoped>
    
</style>
<template>
    <div>
        <div class="goods-box" v-if="goods.length">
            <slider :datas="goods" :range ="range" :params="{minMoveDistance: 50, autoPlay: false}"></slider>
        </div>
        <div class="goods-box" v-if="!goods.length">
            数据不存在
        </div>
    </div>
</template>

<script>
import Slider from '../../components/slider/index.vue';

export default {
    components: {
        [Slider.name]: Slider
    },
    data(){
        return {
            goods: [],
            range: []
        }
    },
    mounted () {
        this.axios
        .get('/api/goods/all',  {
            params: {
                size: 30
            }
        })
        .then(res => {
            if(res.data.status.code === '200'){
                this.goods = res.data.data;
                let max =  this.goods[0].price[0];
                this.goods[0].price.forEach((item, index)=>{
                    max = max > item? max: item; 
                });
                let min =  this.goods[0].price[0];
                this.goods[0].price.forEach((item, index)=>{
                    min = min > item? item: min; 
                });
                this.range.push(min, max);
                return;
            }
            alert(res.data.status.msg);
        })
  }
}
</script>