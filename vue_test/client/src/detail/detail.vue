<style lang="less" scoped>
.header {
    width: 100%;
    height: 108px;
    background: white;

    &-img {
        float: left;
        width: 66px;
        height: 65px;
        margin-top: 22px;
        margin-left: 21px;
        margin-right: 21px;

        & img {
            width: 66px;
            height: 65px;
        }
    }

    &-info {
        float: left;
        margin-top: 22px;

        &-title {
            width: 226px;
            height: 30px;
            line-height: 30px;
            font-size: 22px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &-price {
            height: 37px;
            margin-top: 8px;
            line-height: 37px;

            &-range {
                display: inline-block;
                float: left;
                width: 141px;
                margin-right: 22px;
                font-size: 26px;
            }

            & .header-status {
                display: inline-block;
                float: left;
                width: 64px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                background: red;
                border-radius: 8px;
                color: white;
                font-size: 22px;
            }
        }

    }
}

.desc {
    width: 344px;
    margin: 0 auto;
    margin-top: 18px;
    margin-bottom: 16px;
    border-radius: 10px;
    background-color: white;

    &-size {
        overflow: hidden;

        &-name {
            float: left;
            width: 88px;
            margin-left: 24px;
            line-height: 56px;
            font-size: 22px;
        }

        &-value {
            float: left;
            width: 190px;
            margin-left: 33px;
            line-height: 56px;
            font-size: 22px;
        }
    }
}

.exhibition {
    margin-bottom: 16px;

    & img {
        width: 100%;
    }
}

.desc-text {
    font-size: 22px;
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
    line-height: 56px;
    text-align: center;
}
</style>
<template>
    <div class="container">
        <div class="header">
            <div class="header-img"><img :src="titleImg"></div>
            <div class="header-info">
                <div class="header-info-title">{{goodInfo.good_title}}</div>
                <div class="header-info-price">
                    <span class="header-info-price-range">￥{{priceRange}}</span>
                    <span class="header-status" v-if="goodInfo.goods_status === 1">未上架</span>
                    <span class="header-status" v-if="goodInfo.goods_status === 2">预售</span>
                    <span class="header-status" v-if="goodInfo.goods_status === 3">售卖中</span>
                    <span class="header-status notsales" v-if="goodInfo.goods_status === 4">下架</span>
                </div>
            </div>
        </div>
        <div class="desc">
            <div class="desc-size" v-for="(item, index) in property">
                <span class="desc-size-name">{{item.property_name}}</span>
                <span class="desc-size-value">{{item.property_value}}</span>
            </div>
        </div>
        <div class="exhibition">
            <div v-for="item in goodImg"><img :src="item.good_img" alt=""></div>
        </div>
        <div class="desc-text">{{goodInfo.good_desc}}</div>
        <div class="btn" @click="next">
            立即购买
        </div>
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
    methods: {
        next() {
            this.$store.commit('selectTitle', this.goodInfo.good_title);
            this.$router.push({
                path: '/select',
                query: {
                    id: this.$route.query.id
                }
            })
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
                }
            })
    }
}
</script>