<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
}

.header {
    width: 100%;
    height: 108px;
    background-color: white;

    &-img {
        margin-left: 18px;
        margin-top: 22px;
    }

    &-img img {
        width: 66px;
        height: 65px;
        text-align: center;
    }

    &-img,
    &-info,
    &-price,
    &-status {
        display: inline-block;
    }

    &-info {
        margin-left: 21px;
        margin-top: 18px;
        position: absolute;
        font-size: 20px;
    }

    &-title {
        width: 226px;
        height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    &-price {
        height: 37px;
        margin-top: 6px;
    }

    &-status {
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
}

.desc {
    &-size {
        width: 344px;
        background-color: white;
        margin: 0 auto;
        border-radius: 10px;
        margin-top: 18px;
        font-size: 20px;

        & li {
            display: flex;
            justify-content: space-around;
        }

        &-name {
            width: 105px;
            margin-left: 24px;
            line-height: 56px;
            font-size: 22px;
        }

        &-value {
            width: 217px;
            margin-left: 33px;
            line-height: 56px;
            font-size: 22px;
        }
    }

    &-img {
        width: 100%;
        margin-top: 16px;

        & img {
            width: 100%;
        }
    }

    &-text {
        font-size: 22px;
    }
}

.btn {
    width: 264px;
    height: 56px;
    margin: 0 auto;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    border-radius: 28px;
    background-color: #F1D500;
    font-size: 22px;
    text-align: center;
    line-height: 56px;
}
</style>
<template>
    <div class="detail-box">
        <div class="header">
            <div class="header-img"><img :src="titleImg"></div>
            <div class="header-info">
                <div class="header-title">{{goodInfo.good_title}}</div>
                <div class="header-price">￥{{priceRange}}
                    <span class="header-status" v-if="goodInfo.goods_status === 1">未上架</span>
                    <span class="header-status" v-if="goodInfo.goods_status === 2">预售</span>
                    <span class="header-status" v-if="goodInfo.goods_status === 3">售卖中</span>
                    <span class="header-status notsales" v-if="goodInfo.goods_status === 4">下架</span>
                </div>
            </div>
        </div>
        <div class="desc">
            <div class="desc-size">
                <ul>
                    <li v-for="(item, index) in property">
                        <span class="desc-size-name">{{item.property_name}}</span>
                        <span class="desc-size-value">{{item.property_value}}</span>
                    </li>
                </ul>
            </div>
            <div class="desc-img">
                <ul>
                    <li v-for="item in goodImg"><img :src="item.good_img" alt=""></li>
                </ul>
            </div>
            <div class="desc-text">{{goodInfo.good_desc}}</div>
        </div>
        <router-link class="btn" tag="div" :to="{ path: '/select', query:{id: this.$route.query.id}}">
            立即购买
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodInfo: {},
            goodImg: {},
            property: {},
            titleImg: '',
            priceRange: ''
        }
    },
    mounted() {
        this.priceRange = this.$route.query.price_range;
        this.axios
            .get('/api/goods/detail', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.goodInfo = res.data.data.info[0];
                    this.goodImg = res.data.data.result[0];
                    this.titleImg = this.goodImg[0].good_img;
                    this.property = res.data.data.result[1];
                    return;
                }
                alert(res.data.status.msg);
            });
    }
}
</script>