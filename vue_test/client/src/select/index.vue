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

a {
    text-decoration: none;
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

.active {
    border: solid 1px blue;
}
</style>
<template>
    <div>
        <div class="color-box">
            <div class="item-title">选择颜色</div>
            <ul class="item-color">
                <li v-for="(item, index) in data" :class="{active:index === clickEvent.currentColor}" @click="selectColor(index)">
                    <div><img :src="item.image" alt=""></div>
                    <div>{{item.color}}</div>
                </li>
            </ul>
        </div>
        <div class="size-box">
            <div class="item-title">选择尺码</div>
            <ul class="item-size">
                <li v-for="(item, index) in data" :class="{active:index === clickEvent.currentSize}" @click="selectSize(index)">{{item.size}}</li>
            </ul>
        </div>
        <div class="quantity-box">
            <div class="item-title">选择数量</div>
            <ul class="item-quantity">
                <li v-for = "(item, index) in quantity" :class="{active:index === clickEvent.currentNum}" @click="selectNum(index)">{{item}}</li>
            </ul>
        </div>
        <div class="confirm-btn">
            <router-link exact :to="{ path: '/receivemethod', query:{id: this.$route.query.id, product: this.result}}">
                ￥{{this.result.total}} 下一步
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {},
            price: [],
            quantity: [],
            clickEvent: {
                currentColor: null,
                currentSize: null,
                currentQt: null,
                currentNum: null,
            },
            result: {
                image: null,
                color: null,
                size: null,
                quantity: null,
                unit: null,
                total: null,
            },
        }
    },
    methods: {
        selectColor(index) {
            this.clickEvent.currentColor = index;
            this.result.color = this.data[index].color;
            this.result.image = this.data[index].image;
        },
        selectSize(index) {
            this.clickEvent.currentSize = index;
            this.result.size = this.data[index].size;
            this.result.unit = this.price[index];
        },
        selectNum(index) {
            this.clickEvent.currentNum = index;
            this.result.quantity = index+1;
            this.result.total = this.result.unit*this.result.quantity;
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/detail', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.data = res.data.data.size;
                    for (let i = 1; i <= this.data.length; i++) {
                        this.quantity.push(i);
                    };
                    this.price = res.data.data.price.map(function(price) {
                        return price.good_price;
                    }); 
                    return
                }
                alert(res.data.status.msg);
            });
    },
}
</script>