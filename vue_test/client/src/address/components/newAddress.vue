<style lang="less" scoped>
    *{
    padding: 0;
    margin: 0;
}
.container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;

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
            margin-top: 33px;
            font-size: 22px;
            color: grey;
            outline: none;
        }

        & hr{
            width: 344px;
            margin: 0 auto;
        }
    }
}
.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 300px;
    background-color: #F1D000;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}
</style>
<template>
    <div class="container">
        <div class="title">填写地址</div>
        <div class="input-wrapper">
            <input type="text" v-model="name" @focus="focusName" @blur = "blurName">
            <hr />
            <input type="text" v-model="tele" @focus="focusTele" @blur = "blurTele">
            <hr />
            <input type="text" v-model="local" @focus="focusLocal" @blur = "blurLocal">
            <hr />
        </div>
        <div class="btn" @click="handleConfirm">
            确认添加
        </div>
    </div>
</template>
<script>
export default {
    name: 'NewAddress',
    data() {
        return {
            name: '姓名',
            tele: '手机号码',
            local: '详细地址'
        }
    },
    methods: {
        handleConfirm() {
            this.$emit("close");
        },
        focusName() {
            this.name = ""
        },
        focusTele() {
            this.tele = ""
        },
        focusLocal() {
            this.local = ""
        },
        blurName() {
            if(this.name == ""){
                this.name ="姓名"
            }else{
                return
            }
        },
        blurTele() {
            if(this.tele == ""){
                this.tele ="手机号码"
            }else{
                return
            }
        },
        blurLocal() {
            if(this.local == ""){
                this.local ="详细地址"
            }else{
                return
            }
        },
    },
}
</script>