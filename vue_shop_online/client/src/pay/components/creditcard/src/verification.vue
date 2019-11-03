<style lang="less" scoped>
    .container{
        & .title{
        margin-top: 32px;
        margin-left: 16px;
        font-size: 28px;
    }

    & .number{
        margin-top: 16px;
        margin-left: 16px;
        font-size: 24px;
    }

        & .codeTitle {
            margin-top: 29px;
            margin-left: 16px;
            font-size: 22px;
    }
        & .input-wrapper{
        margin-top: 16px;
        margin-left: 16px;
        margin-right: 16px;

        & input{
            width: 100%;
            line-height: 30px;
            font-size: 24px;
            color: grey;
            outline: none;
        }
    }
        & .btn {
        position: fixed;
        width: 264px;
        height: 56px;
        left: 0;
        right: 0;
        bottom: 53px;
        margin: 0 auto;
        border-radius: 28px;
        background: #F1D500;
        font-size: 25px;
        line-height: 56px;
        text-align: center;
    }

    & .noCodehelp{
        position: fixed;
        width: 140px;
        left: 0;
        right: 0;
        bottom: 25px;
        margin: 0 auto;
        text-align: center;
        font-size: 20px;
    }
}
</style>
<template>
    <div class="container">
        <div class="title">验证码已发送至</div>
        <p class="number">13691233863</p>
        <div class="codeTitle">请输入短信验证码</div>
        <div class="input-wrapper">
            <input type="text" v-model="code">
        </div>
        <div class="btn" @click="next">继续</div>
        <div class="noCodehelp" @click = "codeHelp">收不到验证码?</div>
    </div>
</template>
<script>
export default {
    name: 'Verification',
    data() {
        return {
            code: '',
        }
    },
    methods: {
        next() {},
        codeHelp(){
            this.$router.push({
                path:'/help', 
            })
        },
    }
}
</script>