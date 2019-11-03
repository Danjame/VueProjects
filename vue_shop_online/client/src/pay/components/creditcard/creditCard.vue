<style lang="less" scoped>
    .container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 1;

    & .title{
        margin-top: 32px;
        margin-left: 16px;
        font-size: 28px;
    }

    & .input-wrapper{
        margin-top: 29px;
        margin-left: 16px;
        margin-right: 16px;

        & input{
            width: 100%;
            margin-top: 33px;
            line-height: 30px;
            font-size: 22px;
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
        <div class="title">基本信息</div>
        <div class="input-wrapper">
            <input type="text" v-model="name" @focus="focusName" @blur="blurName">
            <hr />
            <input type="text" v-model="cardNum" @focus="focusCardnum" @blur="blurCardnum">
            <hr />
        </div>
        <div class="btn" @click="next">下一步</div>
    </div>
</template>
<script>
export default {
    name: 'CreditCard',
    data() {
        return {
            name: "姓名",
            cardNum: "卡号"
        }
    },
    methods: {
        next() {
            if (this.name == "姓名") {
                alert("请输入姓名");
                return;
            } else if (this.name == "卡号") {
                alert("请输入卡号");
                return;
            } else {
                this.$router.push({
                    path: '/verification',
                    query: {
                        id: this.$route.query.id
                    }
                })
            }
        },
        focusName() {
            if (this.name == "姓名") {
                this.name = ""
            } else {
                return
            }
        },
        focusCardnum() {
            if (this.cardNum == "卡号") {
                this.cardNum = ""
            } else {
                return
            }
        },
        blurName() {
            if (this.name == "") {
                this.name = "姓名"
            } else {
                return
            }
        },
        blurCardnum() {
            if (this.cardNum == "") {
                this.cardNum = "卡号"
            } else {
                return
            }
        }
    }
}
</script>