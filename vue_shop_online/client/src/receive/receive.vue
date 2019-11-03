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
        padding: 24px 24px 38px 24px;
        border-radius: 12px;
        background-color: white;
        font-size: 20px;

        &-name {
            font-size: 22px;
        }

        &-desc {
            margin-top: 16px;
            font-size: 20px;
        }
    }

    & .selected {
        background-color: #f1d548;
        color: #3e0707;
    }
}

.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 180px;
    margin-bottom: 20px;
    background-color: white;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}

.colorFul {
    background: #F1D500 !important
}
</style>
<template>
    <div>
        <div class="title">选择收货方式</div>
        <div class="method">
            <div class="method-wrapper" :class="{selected: itemIndex == index}" v-for="(content, index) in delivery" @click="select(index)">
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
        }
    },
    methods: {
        select(index) {
            this.itemIndex = index;
        },
        next() {
            if (this.itemIndex == 0) {
                this.$store.commit('receiveMethod', this.delivery[this.itemIndex].name);
                this.$router.push({ path: '/address', query: { id: this.$route.query.id } })
            } else if (this.itemIndex == 1) {
                this.$store.commit('receiveMethod', this.delivery[this.itemIndex].name);
                this.$router.push({ path: '/service/region', query: { id: this.$route.query.id } })
            }
        }
    }
}
</script>