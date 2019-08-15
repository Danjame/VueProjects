<style lang="less" scoped>
    
</style>
<template>
    <div>
        <div class="goods-box" v-if="goods.length">
            <slider :datas="goods" :params="{minMoveDistance: 50, autoPlay: false}"></slider>
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
            goods: []
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
                return;
            }
            alert(res.data.status.msg);
        })
  }
}
</script>