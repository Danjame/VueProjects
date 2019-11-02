<style lang="less" scoped>
.isEmpty {
    width: 264px;
    height: 30px;
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

        &-edit {
            display: inline-block;
            float: right;
            width: 50px;
            height: 50px;
            margin-top: -9px;
            margin-right: 30px;
            line-height: 50px;
            color: #0C70E4;
            font-size: 20px;
            text-align: center;
        }

        &-delete {
            display: inline-block;
            float: right;
            width: 50px;
            height: 50px;
            margin-top: -9px;
            line-height: 50px;
            color: #DD5045;
            font-size: 20px;
            text-align: center;
        }

        &-name {
            height: 30px;
            line-height: 30px;
            font-size: 22px;
        }

        &-tele {
            height: 28px;
            margin-top: 17px;
            line-height: 28px;
            font-size: 20px;
        }

        &-local {
            height: 28px;
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
    margin-top: 20px;
    background-color: #F1D000;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}

.plusBtn {
    width: 150px;
    height: 40px;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
}

.hidden {
    opacity: 0.7;
}

.actived {
    background: #F1D500 !important
}
</style>
<template>
    <div class="wrapper" :class="{hidden: isHidden}">
        <div class="isEmpty" v-if="addresses.length == 0">亲，你还没有添加地址哦～</div>
        <div class="address-title" v-else>选择地址</div>
        <div class="address-wrapper">
            <div class="address-item" v-for="(item, index) in addresses" :class="{actived: selected}" @click="select(item, index)">
                <span class="address-item-delete" @click.stop="deleteCurrentItem(item, index)">删除</span>
                <span class="address-item-edit" @click.stop="editCurrentItem(item, index)">修改</span>
                <p class="address-item-name">{{item.name}}</p>
                <p class="address-item-tele">{{item.tele}}</p>
                <p class="address-item-local">{{item.region}} {{item.local}}</p>
            </div>
        </div>
        <new-address :newAdd="newAdd" @close="closeAddress" @back="back" v-show="newAdd"></new-address>
        <edit-address :editItem="editItem" @edit="editAddress" v-show="editAdd"></edit-address>
        <div class="btn" v-if="addresses.length == 0" @click="handleAddress">
            + &nbsp;添加新地址
        </div>
        <div v-else>
            <div class="btn" @click="next">确认</div>
            <div class="plusBtn" @click="handleAddress"> + &nbsp;添加新地址</div>
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
            isHidden: false,
            newAdd: false,
            editAdd: false,
            selected: false,
            addresses: [],
            editItem: null,
            selectedAdd: null,
        }
    },
    methods: {
        next() {
            if (this.selectedAdd != null) {
                this.$store.commit('selectAddress', this.selectedAdd)
                this.$router.push({
                    path: '/pay',
                    query: {
                        id: this.$route.query.id
                    }
                })
            } else {
                alert("请选择一个收货地址");
            }
        },
        back() {
            this.isHidden = false;
            this.newAdd = false;
        },
        deleteCurrentItem(item, index) {
            this.addresses.splice(index, 1);
        },
        editCurrentItem(item, index) {
            this.editItem = item;
            this.editItem.index = index;
            this.isHidden = true;
            this.editAdd = true;
        },
        select(item, index) {
            this.selected = true;
            this.selectedAdd = item;
        },
        handleAddress() {
            this.isHidden = true;
            this.newAdd = true
        },
        closeAddress(arg1, arg2, arg3, arg4) {
            this.isHidden = false;
            this.newAdd = false;
            const { name, tele, region, local } = { name: arg1, tele: arg2, region: arg3, local: arg4 };
            this.addresses.push({ name, tele, region, local });
        },
        editAddress(arg1) {
            this.isHidden = false;
            this.editAdd = false;
            this.addresses.splice(arg1.index, 1, arg1);
        }
    }
}
</script>