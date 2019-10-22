<style lang="less" scoped>
.confirm-btn {
    width: 264px;
    height: 54px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 300px;
    background-color: #F1D548;
    text-align: center;
    line-height: 54px;
    font-size: 32px;
    border-radius: 28px;
}
</style>
<template>
    <div>
        <div class="confirm-btn">
            添加新地址
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {},
        }
    },
    methods: {

    },
    // mounted() {
    //     this.axios
    //         .get('/api/goods/address', {
    //             params: {
    //                 id: this.$route.query.id,
    //             },
    //         })
    //         .then(res => {
    //             if (res.data.status.code === '200') {
    //                 this.data = res.data.data;
    //                 console.log(this.data);
    //                 return;
    //             }
    //             alert(res.data.status.msg);
    //         })
    // }
}
</script>