<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

.isEmpty{
    width: 264px;
    margin: 0 auto;
    margin-top: 325px;
    line-height: 30px;
    font-size: 22px;
}

.address-title {
    margin-top: 32px;
    margin-left: 16px;
    margin-bottom: 32px;
    font-size: 28px;
}

.address-wrapper {
    margin-top: 32px;
    margin-left: 16px;

    & .address-item {
        box-sizing: border-box;
        width: 344px;
        height: 184px;
        margin-top: 32px;
        border-radius: 12px;
        background: white;
        padding: 24px;

        &-name {
            line-height: 30px;
            font-size: 22px;
        }

        &-tele {
            margin-top: 17px;
            line-height: 28px;
            font-size: 20px;
        }

        &-local {
            margin-top: 8px;
            line-height: 28px;
            font-size: 20px;
        }
    }
}

.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
    background-color: #F1D000;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}

.actived {
    background: #F1D500 !important
}
</style>
<template>
    <div>
        <div class="isEmpty" v-if="addresses.length == 0">亲，你还没有添加地址哦～</div>
        <div class="address-title" v-else >选择地址</div>
        <div class="address-wrapper">
            <div class="address-item" v-for="(item, index) in addresses" :class="{actived: selected}" @click="select">
                <p class="address-item-name">{{item.name}}</p>
                <p class="address-item-tele">{{item.tele}}</p>
                <p class="address-item-local">{{item.local}}</p>
            </div>
        </div>
        <new-address @close="closeAddress" v-show="newAdd"></new-address>
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
            selected: false,
            addresses: [],
        }
    },
    methods: {
        select() {
            this.selected = true;
        },
        handleAddress() {
            this.newAdd = true
        },
        closeAddress(arg1, arg2, arg3) {
            this.newAdd = false;
            let obj = {};
            obj.name = arg1;
            obj.tele = arg2;
            obj.local = arg3;
            this.addresses.push(obj);
            console.log(this.addresses);
            console.log(this.addresses[0]);
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