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

        &-edit{
            display: inline-block;
            float: right;
            width: 50px;
            height: 50px;
            line-height: 50px;
            background: yellow;
            text-align: center;
            z-index: 5;
        }
        &-delete{
            display: inline-block;
            float: right;
            width: 50px;
            height: 50px;
            line-height: 50px;
            background: yellow;
            text-align: center;
            z-index: 5;
        }
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
                <span class="address-item-delete" @click="deleteCurrentItem(item, index)">删除</span>
                <span class="address-item-edit" @click="editCurrentItem(item, index)">修改</span>
                <p class="address-item-name">{{item.name}}</p>
                <p class="address-item-tele">{{item.tele}}</p>
                <p class="address-item-local">{{item.region}} {{item.local}}</p>
            </div>
        </div>
        <new-address :newAdd = "newAdd" @close="closeAddress" v-show="newAdd"></new-address>
        <edit-address :editItem="editItem" @edit="editAddress" v-show="editAdd"></edit-address>
        <div class="btn" @click="handleAddress">
            添加新地址
        </div>
    </div>
</template>
<script>
import NewAddress from './components/newAddress.vue';
import EditAddress from './components/editAddress.vue';
export default {
    components: {
        NewAddress,
        EditAddress
    },
    data() {
        return {
            newAdd: false,
            editAdd: false,
            selected: false,
            addresses: [],
            editItem: null,
        }
    },
    methods: {
        deleteCurrentItem(item, index){

        },
        editCurrentItem(item, index){
            this.editItem = item;
            this.editItem.index = index;
            console.log(this.editItem);
            this.editAdd = true;
        },
        select() {
            this.selected = true;
        },
        handleAddress() {
            this.newAdd = true
        },
        closeAddress(arg1, arg2, arg3, arg4) {
            this.newAdd = false;
            const {name, tele, region, local} = {name:arg1, tele:arg2, region:arg3, local: arg4};
            this.addresses.push({name, tele, region, local});
        },
        editAddress(arg1) {
            this.editAdd = false;
            this.addresses.splice(arg1.index, 1, arg1);
            console.log(this.addresses)
        },
    },
}
</script>