<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    font-size: 16px;
}

.item-title {
    font-size: 28px;
    line-height: 40px;
}

.color-wrapper {
    margin-left: 16px;
    margin-top: 32px;

    & .item-color {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 16px;

        & li {
            width: 102px;
            margin-right: 17px;
            margin-bottom: 16px;
            text-align: center;

            & img {
                width: 100%;
                border-radius: 10px;
            }
        }

        &-text {
            font-size: 22px;
            line-height: 30px;
        }
    }
}

.size-wrapper {
    margin-left: 16px;
    margin-top: 32px;

    & .item-size {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 16px;

        & li {
            width: 100px;
            height: 56px;
            margin-right: 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            background: white;
            line-height: 56px;
            text-align: center;
            font-size: 22px;
        }
    }
}

.quantity-wrapper {
    margin-left: 16px;
    margin-top: 32px;

    & ul {
        display: inline-block;
        width: 100%;
        margin-top: 16px;
        overflow: hidden;

        & li {
            float: left;
            width: 56px;
            height: 56px;
            margin-right: 15px;
            margin-bottom: 16px;
            border-radius: 8px;
            background: white;
            line-height: 56px;
            text-align: center;
            font-size: 22px;
        }
    }

    & .itemQuantity {
        height: 56px;
    }

    & .item-extend {
        float: right;
        box-sizing: border-box;
        width: 128px;
        height: 56px;
        margin-right: 16px;
        border-radius: 8px;
        background: white;
        overflow: auto;
        line-height: 56px;
        font-size: 22px;
        padding-left: 22px;

        &-arrow {
            display: inline-block;
            margin-left: 15px;
            position: absolute;
            margin-top: 24px;

            &-top {
                width: 0;
                height: 0;
                border: 12px solid transparent;
                border-top: 12px solid black;
            }

            &-bottom {
                width: 0;
                height: 0;
                border: 12px solid transparent;
                border-top: 12px solid white;
                margin-top: -27px;
            }
        }
    }

    & .item-rollup {
        display: inline-block;
        box-sizing: border-box;
        width: 128px;
        height: 56px;
        margin-right: 16px;
        border-radius: 8px;
        background: white;
        line-height: 56px;
        font-size: 22px;
        padding-left: 22px;

        &-arrow {
            display: inline-block;
            margin-left: 15px;
            position: absolute;
            margin-top: 10px;

            &-top {
                width: 0;
                height: 0;
                border: 12px solid transparent;
                border-bottom: 12px solid black;
            }

            &-bottom {
                width: 0;
                height: 0;
                border: 12px solid transparent;
                border-bottom: 12px solid white;
                margin-top: -21px;
            }
        }
    }
}

.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 54px;
    background: #F1D500;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;

    &-price {
        float: left;
        margin-left: 40px;
    }

    &-next {
        float: right;
        margin-right: 40px;
    }
}

.actived {
    background: #F1D500 !important
}
</style>
<template>
    <div>
        <div class="color-wrapper">
            <div class="item-title">选择颜色</div>
            <ul class="item-color">
                <li v-for="(item, index) in result" :class="{actived:index == colorIndex}" @click="selectColor(item, index)">
                    <div><img :src="item.image" alt=""></div>
                    <div class="item-color-text">{{item.color}}</div>
                </li>
            </ul>
        </div>
        <div class="size-wrapper">
            <div class="item-title">选择尺码/版本</div>
            <ul class="item-size">
                <li v-for="(item, index) in result" :class="{actived:index == sizeIndex}" @click="selectSize(item, index)">{{item.size}}</li>
            </ul>
        </div>
        <div class="quantity-wrapper">
            <div class="item-title">选择数量</div>
            <ul :class="{itemQuantity: extend}">
                <div class="item-extend" v-show="extend" @click="extendMore">展开
                    <span class="item-extend-arrow">
                        <div class="item-extend-arrow-top"></div>
                        <div class="item-extend-arrow-bottom"></div>
                    </span>
                </div>
                <li v-for="(item, index) in quantity" :class="{actived: index == numIndex}" @click="selectNum(item, index)">{{item}}</li>
                <span class="item-rollup" v-show="extend == false" @click="extendMore">收起
                    <span class="item-rollup-arrow">
                        <div class="item-rollup-arrow-top"></div>
                        <div class="item-rollup-arrow-bottom"></div>
                    </span>
                </span>
            </ul>
        </div>
        <router-link class="btn" tag="div" :to="{ path: '/receive', query:{id: this.$route.query.id}}">
            <span class="btn-price">￥{{this.selected.total}}</span>
            <span class="btn-next">下一步</span>
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: {},
            quantity: 8,
            colorIndex: null,
            sizeIndex: null,
            numIndex: null,
            price: {},
            extend: true,
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
        extendMore() {
            if (this.extend == true) {
                this.extend = false
            } else {
                this.extend = true
            }
        }
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
            })
    }
}
</script>