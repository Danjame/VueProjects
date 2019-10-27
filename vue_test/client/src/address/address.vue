<style lang="less" scoped>
/* .new-address{
    display: flex: ;
    flex-direction: column;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: blue;
} */
.address-wrapper {
    height: 400px;
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
    <div>
        <div class="address-wrapper">
            当前还没有收货地址
        </div>
        <new-address @close="handleAddress" v-show="newAdd"></new-address>
        <div class="btn" @click="handleAddress">
            添加新地址
        </div>
    </div>
</template>
<script>
import NewAddress from './components/newAddress.vue';
export default {
    components: {
        NewAddress
    },
    data() {
        return {
            newAdd: false,
        }
    },
    methods: {
        handleAddress() {
            if(this.newAdd==false){
                this.newAdd = true
            }else{
                this.newAdd = false
            }
            
        },
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