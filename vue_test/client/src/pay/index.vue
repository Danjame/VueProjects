<style lang="less" scoped>
</style>
<template>
    <div class="pay-box">
    	<div>
    		选择支付方式
    		当前id是：{{ this.$route.query.id }}
    	</div>	
        <div>
        	<img :src="img[1].good_img">
        </div>
        <div>{{data.info[0].good_title}}</div>
        <div>{{data.result[0][1].good_price}}</div>
        <div v-for= "item in method">{{item}}</div>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            data: {},
            method:{},
            img:{}
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/pay', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.data = res.data.data;
                    this.img = this.data.result[1];
                    this.method = this.data.result[2].map(function(pay) {
                        return pay.method;
                    });
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>