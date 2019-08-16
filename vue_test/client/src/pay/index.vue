<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

.select-method {
    width: 168px;
    height: 60px;
    margin-left: 16px;
    line-height: 62px;
    font-size: 28px;
}

.head {
    width: 100%;
    height: 108px;
}

.goods-img {
    margin-left: 18px;
    margin-top: 22px;
}

.goods-img img {
    width: 66px;
    height: 65px;
    text-align: center;
}

.goods-img,
.goods-info,
.goods-detail-box {
    display: inline-block;
}

.goods-info {
    margin-left: 21px;
    margin-top: 18px;
    position: absolute;
    font-size: 22px;
}

.goods-title {
    width: 250px;
    height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.goods-detail-box {
    width: 250px;
}

.goods-detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 21px;
}

.goods-price {
    width: 63px;
    height: 37px;
    font-size: 24px;
}

.goods-num {
    width: 16px;
    height: 37px;
    line-height: 37px;
    font-size: 24px;
}

.payment {
    width: 90%;
    height: 104px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    padding-left: 10px;
    border-radius: 10px;
    background-color: white;
    font-size: 22px;
    line-height: 104px;
}

.btn-purchase {
    width: 264px;
    height: 56px;
    position: fixed;
    bottom: 56px;
    margin-left: 56px;
    border-radius: 30px;
    background-color: #F3DA00;
    font-size: 25px;
    text-align: center;
    line-height: 56px;
}

a {
    text-decoration: none;
}

.active {
    border: solid 1px blue;
}

</style>
<template>
    <div class="pay-box">
        <div class="select-method">
            选择支付方式
        </div>
        <div class="head">
            <div class="goods-img"><img :src="img[1].good_img"></div>
            <div class="goods-info">
                <div class="goods-title">{{data.info[0].good_title}}</div>
            </div>
            <div class="goods-detail-box">
                <div class="goods-detail">
                    <div class="goods-price">
                        ￥{{data.result[0][1].good_price}}
                    </div>
                    <span class="goods-num">
                        1
                    </span>
                </div>
            </div>
        </div>
        <div class="payment" 
             v-for="(item, index) in method"
             :class="{active: index === currentNum}"
             @click="selectPayment(index)">{{item}}</div>
        <div class="btn-purchase">
            <router-link exact :to="{ path: '/select', query:{id: this.$route.query.id }}">
                立即购买
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {},
            method: {},
            img: {},
            currentNum:0,
        }
    },
    methods:{
        selectPayment(index){
            this.currentNum = index;
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