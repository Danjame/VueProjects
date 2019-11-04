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
    <div class="container">
        <div class="title">基本信息</div>
        <div class="input-wrapper">
            <input type="text" v-model="name" @focus="focusName" @blur="blurName">
            <hr />
            <input type="text" v-model="tele" @focus="focusTele" @blur="blurTele">
            <hr />
        </div>
        <div class="btn" @click="next">下一步</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "姓名",
            tele: "手机号"
        }
    },
    methods: {
        next() {
            if (this.name == "姓名" || this.name == "") {
                alert("请输入姓名");
            } else if (this.tele == "手机号" || this.tele == "") {
                alert("请输入手机号");
            } else {
                this.$router.push({
                    path: '/pay',
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
        focusTele() {
            if (this.tele == "手机号") {
                this.tele = ""
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
        blurTele() {
            if (this.tele == "") {
                this.tele = "手机号"
            } else {
                return
            }
        }
    }
}
</script>