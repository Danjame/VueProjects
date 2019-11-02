<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 99;

    & .window {
        width: 98%;
        height: 50%;
        margin: 0 auto;

        & .backBtn {
            /*         padding: 1px; */
            /* position: relative; */
            border-radius: 6px;
            background: #F1D000;
            font-size: 22px;
        }
    }

}
</style>
<template>
    <div class="container">
        <div>微信支付接口</div>
        <div class="window">
            <p>支付成功</p>
            <div class="backBtn">返回</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WechatPay',
    data() {
        return {

        }
    },
}
</script>