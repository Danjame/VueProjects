<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

.head {
    width: 100%;
    height: 108px;
    background-color: white;
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
.goods-price,
.goods-status {
    display: inline-block;
}

.goods-info {
    margin-left: 21px;
    margin-top: 18px;
    position: absolute;
    font-size: 20px;
}

.goods-title {
    width: 226px;
    height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.goods-price {
    height: 37px;
    margin-top: 6px;
}

.goods-status {
    width: 64px;
    height: 32px;
    margin-top: 6px;
    margin-left: 32px;
    text-align: center;
    line-height: 32px;
    background-color: red;
    border-radius: 8px;
    color: white;
}

.goods-size {
    width: 93%;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 18px;
    font-size: 20px;
}

.goods-size li {
    display: flex;
    justify-content: space-around;
}

.goods-size-name,
.goods-size-value {
    width: 30%;
}

.goods-desc {
    width: 100%;
    margin-top: 18px;
}

.goods-desc img {
    width: 100%
}

.btn-box {
    height: 130px;
}

.btn-purchase {
    width: 264px;
    height: 56px;
    position: absolute;
    margin-top: 56px;
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
</style>
<template>
    <div class="detail-box">
        <div class="head">
            <div class="goods-img"><img :src="goodImg.good_img"></div>
            <div class="goods-info">
                <div class="goods-title">{{goodInfo.good_title}}</div>
                <div class="goods-price">
                    ￥{{price_range.join('-')}}
                    <span class="goods-status" v-if="goodInfo.goods_status === 2">预售</span>
                    <span class="goods-status notsales" v-if="goodInfo.goods_status === 4">下架</span>
                </div>
            </div>
        </div>
        <div class="goods-size">
            <ul>
                <li v-for="(item, index) in goods.property">
                    <span class="goods-size-name">{{item.property_name}}</span>
                    <span class="goods-size-value">{{item.property_value}}</span>
                </li>
            </ul>
        </div>
        <div class="goods-desc">
            <ul>
                <li v-for="item in size"><img :src="item.image" alt=""></li>
            </ul>
        </div>
        <div class="btn-box">
            <div class="btn-purchase">
                <router-link exact :to="{ path: '/select', query:{id: this.$route.query.id}}">
                    立即购买
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goods: {},
            price: [],
            price_range: this.$route.query.price_range,
            goodInfo: {},
            goodImg: {},
            size: []
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/detail', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.goods = res.data.data;
                    this.price = this.goods.price.map(function(price) {
                        return price.good_price;
                    });                   
                    this.goodInfo = this.goods.info[0];
                    this.goodImg = this.goods.imgs[1];
                    this.size = this.goods.size;
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>