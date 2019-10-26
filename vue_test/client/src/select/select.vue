<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    float: left;
    font-size: 16px;
}

ul {
    overflow: hidden;
    margin-top: 15px;
}

.color-box,
.size-box,
.quantity-box {
    width: 90%;
    height: auto;
    margin: 0 auto;
    margin-top: 35px;
}

.item-color img {
    width: 100%;
}

.item-color,
.item-size,
.item-quantity {
    display: flex;
    justify-content: space-around;
}

.item-color>li> {
    width: 15%;
    display: inline;
}

.item-title {
    font-size: 30px;
}

.size-box li {
    width: 15%;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
}

.quantity-box li {
    width: 10%;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
}

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

.active {
    border: 1px solid blue;
}
</style>
<template>
    <div>
        <div class="color-box">
            <div class="item-title">选择颜色</div>
            <ul class="item-color">
                <li v-for="(item, index) in result" :class="{active:index == colorIndex}" @click="selectColor(item, index)">
                    <div><img :src="item.image" alt=""></div>
                    <div>{{item.color}}</div>
                </li>
            </ul>
        </div>
        <div class="size-box">
            <div class="item-title">选择尺码/版本</div>
            <ul class="item-size">
                <li v-for="(item, index) in result" :class="{active:index == sizeIndex}" @click="selectSize(item, index)">{{item.size}}</li>
            </ul>
        </div>
        <div class="quantity-box">
            <div class="item-title">选择数量</div>
            <ul class="item-quantity">
                <li v-for="(item, index) in quantity" :class="{active: index == numIndex}" @click="selectNum(item, index)">{{item}}</li>
            </ul>
        </div>
        <div class="confirm-btn">
            <router-link tag="div" :to="{ path: '/receive', query:{id: this.$route.query.id}}">
                ￥{{this.selected.total}} 下一步
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: {},
            quantity: 5,
            colorIndex: null,
            sizeIndex: null,
            numIndex: null,
            price: {},
            selected: {
                color: null,
                size: null,
                quantity: null,
                unit: null,
                total: null,
            }
        }
    },
    methods: {
        selectColor(item, index) {
            this.colorIndex = index;
            this.selected.color = item.color;
        },
        selectSize(item, index) {
            this.sizeIndex = index;
            this.selected.size = item.size;
            this.selected.unit = this.price[index];
            this.selected.total = this.selected.unit * this.selected.quantity;
        },
        selectNum(item, index) {
            this.numIndex = index;
            this.selected.quantity = item;
            this.selected.total = this.selected.unit * this.selected.quantity;
        },

    },
    mounted() {
        this.axios
            .get('/api/goods/select', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.result = res.data.data.result[0];
                    this.price = res.data.data.result[1].map(function(price) {
                        return price.good_price;
                    });
                    return;
                }
                alert(res.data.status.msg);
            });
    },
}
</script>