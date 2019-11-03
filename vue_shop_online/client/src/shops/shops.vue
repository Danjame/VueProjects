<style lang="less" scoped>
.container {
    margin-left: 16px;

    & .title {
        height: 40px;
        margin-top: 32px;
        margin-left: 16px;
        margin-bottom: 32px;
        line-height: 40px;
        font-size: 28px
    }

    & .region {
        & li {
            list-style: none;
            float: left;
            width: 103px;
            height: 103px;
            margin-right: 16px;
            margin-bottom: 16px;
            border-radius: 12px;
            background: white;
            line-height: 103px;
            text-align: center;
            font-size: 22px;
        }

        & .activated {
            background: #F1D500;
        }
    }

    & .confirm-btn {
        position: absolute;
        width: 264px;
        height: 56px;
        margin-left: 56px;
        margin-bottom: 23px;
        bottom: 23px;
        background: #F1D500;
        text-align: center;
        line-height: 56px;
        font-size: 32px;
        border-radius: 28px;
    }
}
</style>
<template>
    <div class="container">
        <div class="title">
            选择门店
        </div>
        <ul class="region">
            <li v-for="(item, index) in regions" :class="{activated: itemIndex == index}" @click="select (item, index)">{{item.region_name}}</li>
        </ul>
        <div class="confirm-btn">
            下一步
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemIndex: null,
            regions: {}
        }
    },
    methods: {
        select(item, index) {
            this.itemIndex = index;
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/shops', {
                params: {
                    id: this.$route.query.id,
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.regions = res.data.result;
                    console.log(this.regions)
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>