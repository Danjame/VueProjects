<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 1;

    & .window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 50%;
        margin: 0 auto;

        & .text {
            text-align: center;
            font-size: 22px;
            margin-bottom: 18px;
        }

        & .price{
            text-align: center;
            font-size: 22px;
        }
    }

    & .btn {
        position: fixed;
        width: 264px;
        height: 56px;
        margin: 0 auto;
        left: 0;
        right: 0;
        bottom: 25px;
        border-radius: 28px;
        background: #F1D500;
        font-size: 25px;
        line-height: 56px;
        text-align: center;
    }
}
</style>
<template>
    <div class="container" @touchmove.prevent>
        <div>微信支付接口</div>
        <div class="window">
            <p class="text">支付成功</p>
            <p class="price">2200</p>
        </div>
        <div class="btn" @click= "back">返回</div>
    </div>
</template>
<script>
export default {
    name: 'WechatPay',
    data() {
        return {

        }
    },
    methods:{
        back(){
            this.$emit('back')
        },
    }
}
</script>