<style lang="less" scoped>
.pagetitle {
    margin-top: 32px;
    margin-left: 16px;
    line-height: 40px;
    font-size: 28px;
}

.good-wrapper {
    margin-top: 25px;
    margin-left: 20px;
    overflow: hidden;

    & .good-img {
        float: left;
        width: 72px;
        height: 71px;
        margin-right: 19px;

        & img {
            width: 72px;
            height: 71px;
        }
    }

    & .good-info {
        float: left;
        width: 245px;

        &-title {
            width: 226px;
            height: 30px;
            line-height: 30px;
            font-size: 23px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &-detail {
            display: flex;
            margin-top: 8px;
            flex-direction: row;
            justify-content: space-between;

            &-price {
                height: 37px;
                line-height: 37px;
                font-size: 26px;
            }

            &-quan {
                height: 37px;
                line-height: 37px;
                font-size: 26px;
            }
        }
    }

}

.payment-wrapper {
    clear: both;
    margin-top: 38px;
    margin-bottom: 97px;

    & .payment-method {
        width: 338px;
        height: 88px;
        margin: 0 auto;
        margin-bottom: 16px;
        padding-left: 19px;
        border-radius: 12px;
        background: white;
        font-size: 22px;
        line-height: 88px;
    }
}

.btn {
    width: 264px;
    height: 56px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 25px;
    margin: 0 auto;
    border-radius: 28px;
    background: #F1D500;
    font-size: 25px;
    line-height: 56px;
    text-align: center;
}

.active {
    background: #F1D500 !important;
}
</style>
<template>
    <div class="container">
        <div class="pagetitle">
            选择支付方式
        </div>
        <div class="good-wrapper">
            <div class="good-img"> 
                <!-- <img :src="$store.state.selected.color.img"> -->
            </div>
            <div class="good-info">
                <div class="good-info-title">
                    好玩掌机
                <!-- {{$store.state.itemTitle}} -->
            </div>
                <div class="good-info-detail">
                    <div class="good-info-detail-price">
                        2000元rmb
                        <!-- ￥{{$store.state.selected.total}} -->
                    </div>
                    <span class="good-info-detail-quan">
                        2
                        <!-- {{$store.state.selected.quantity}} -->
                    </span>
                </div>
            </div>
        </div>
        <div class="payment-wrapper">
            <div class="payment-method" v-for="(item, index) in payMethods" :class="{active: index === currentIndex}" @click="selectPayment(item, index)">
                {{item.method}}
            </div>
        </div>
        <wechat-pay v-show="showMethod==0" @back="back"></wechat-pay>
        <credit-card v-show="showMethod==1"></credit-card>
        <store-pay v-show="showMethod==2"></store-pay>
        <ali-pay v-show="showMethod==3"></ali-pay>
        <union-pay v-show="showMethod==4"></union-pay>
        <div class="btn" @click="next">
            去支付
        </div>
    </div>
</template>
<script>
import WechatPay from './components/wechatPay.vue'
import CreditCard from './components/creditcard/creditCard.vue'
import StorePay from './components/storePay.vue'
import AliPay from './components/aliPay.vue'
import UnionPay from './components/unionPay.vue'
export default {
    components: {
        WechatPay,
        CreditCard,
        StorePay,
        AliPay,
        UnionPay
    },
    data() {
        return {
            payMethods: null,
            currentIndex: null,
            showMethod: null,
        }
    },
    methods: {
        back(){
            this.showMethod = null;
        },
        selectPayment(item, index) {
            this.currentIndex = index;
        },
        next() {
            this.showMethod = this.currentIndex;
            // this.$router.push({ path: '/', query:{id: this.$route.query.id }})
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/pay', {
                params: {
                    id: this.$route.query.id
                }
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.payMethods = res.data.data.result;
                }
            })
    }
}
</script>