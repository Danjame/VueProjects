<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

.title {
    width: 168px;
    height: 60px;
    margin-left: 16px;
    line-height: 62px;
    font-size: 28px;
}

.good-wrapper {
    width: 100%;
    height: 108px;
}

.good-img {
    margin-left: 18px;
    margin-top: 22px;
}

.good-img img {
    width: 66px;
    height: 65px;
    text-align: center;
}

.good-img,
.good-info,
.good-detail-box {
    display: inline-block;
}

.good-info {
    margin-left: 21px;
    margin-top: 18px;
    position: absolute;
    font-size: 22px;
}

.good-title {
    width: 250px;
    height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.good-detail-box {
    width: 250px;
}

.good-detail {
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

.good-num {
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

.btn {
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
    <div class="container">
        <!-- <div class="title">
            选择支付方式
        </div>
        <div class="good-wrapper">
            <div class="good-img"><img :src="product.image"></div>
            <div class="good-info">
                <div class="goods-title">{{goodsTitle}}</div>
            </div>
            <div class="goods-detail-box">
                <div class="goods-detail">
                    <div class="goods-price">
                        ￥{{product.total}}
                    </div>
                    <span class="goods-num">
                        {{product.quantity}}
                    </span>
                </div>
            </div>
        </div>
        <div class="payment" v-for="(item, index) in method" :class="{active: index === currentNum}" @click="selectPayment(index)">{{item}}
        </div>
        <div class="btn">
            <router-link exact :to="{ path: '/select', query:{id: this.$route.query.id }}">
                去支付
            </router-link>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {},
            goodsTitle: null,
            method: {},
            img: {},
            currentNum: null,
        }
    },
    methods: {
        selectPayment(index) {
            this.currentNum = index;
        }
    },
</script>