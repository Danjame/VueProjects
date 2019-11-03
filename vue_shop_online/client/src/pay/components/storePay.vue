<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 1;

    & .title {
        height: 215px;
        line-height: 215px;
        text-align: center;
        font-size: 22px;
        margin-bottom: 18px;
    }

    & .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 169px;
        background: #eee;

        & p {
            width: 294px;
            margin: 0 auto;
            text-align: center;
            font-size: 22px;
        }
    }

    & .btn {
        position: fixed;
        width: 264px;
        height: 56px;
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
}
</style>
<template>
    <div class="container" @touchmove.prevent>
        <div>到店支付</div>
        <p class="title">预购成功</p>
        <div class="text">
            <p>我们会以电话或短信的方式与你取得联系 请保持电话畅通</p>
        </div>
        <div class="btn" @click="next">完成</div>
    </div>
</template>
<script>
export default {
    name: 'StorePay',
    data() {
        return {

        }
    },
    methods: {
        next() {
            this.$router.push({
                path: '/',
                query: {
                    id: this.$route.query.id
                }
            })
        }
    }
}
</script>