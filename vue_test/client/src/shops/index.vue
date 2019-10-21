<style lang="less" scoped>
.confirm-btn {
    position: absolute;
    width: 264px;
    height: 56px;
    margin-left: 56px;
    margin-bottom: 23px;
    bottom: 23px;
    background-color: #F1D500;
    text-align: center;
    line-height: 56px;
    font-size: 32px;
    border-radius: 28px;
}
</style>
<template>
    <div>
        <div>
            选择门店
        </div>
        <div>大区
            <ul>
                <li>1</li>
            </ul>
        </div>
        <div class="confirm-btn">
            下一步
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
    //         .get('/api/goods/shops', {
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