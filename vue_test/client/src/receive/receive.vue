<style lang="less" scoped>
.title {
    height: 40px;
    margin-top: 32px;
    margin-left: 16px;
    margin-bottom: 32px;
    line-height: 40px;
    font-size: 28px
}

.method {
    width: 344px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;

    &-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 136px;
        margin-bottom: 16px;
        padding: 5px 24px 10px 24px;
        border-radius: 12px;
        background-color: white;
        font-size: 20px;

        &-name {
            font-size: 22px;
        }

        &-desc {
            font-size: 20px;
        }
    }
}

.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 197px;
    background-color: white;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}

.selected {
    background-color: #f1d548;
    color: #3e0707;
}

.colorFul {
    background: #F1D500 !important
}

</style>
<template>
    <div>
        <div class="title">选择收货方式</div>
        <div class="method">
            <div class="method-wrapper" :class="{selected: itemIndex == index }" v-for="(content, index) in delivery" @click="select(index)">
                <p class="method-wrapper-name">{{content.name}}</p>
                <p class="method-wrapper-desc">{{content.desc}}</p>
            </div>
        </div>
        <div class="btn" :class="{colorFul: itemIndex!==null}" @click="next">
            下一步
        </div>
    </div>
</template>
<script>
import Bus from '../bus.js';
export default {
    data() {
        return {
            delivery: [{
                name: '送货上门',
                desc: '10公里以内的用户门店有货24小时内送达'
            }, {
                name: '门店自提',
                desc: '您可以到附近门店自提'
            }],
            itemIndex: null,
            information: {}
        }
    },
    methods: {
        select(index) {
            this.itemIndex = index;
        },
        next() {
            if (this.itemIndex == 0) {
                this.$router.push({ path: '/address', query: { id: this.$route.query.id } })
            } else if (this.itemIndex == 1) {
                this.$router.push({ path: '/shops', query: { id: this.$route.query.id } })
            }
        }
    },
    created(){
        console.log("123");
        Bus.$on('updata', (item)=> {
            console.log("123");
            console.log(item);
        })
    },
}
</script>