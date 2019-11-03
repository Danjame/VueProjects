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
            <li :class="{activated: itemIndex == index}" v-for="(item, index) in regions" @click="select (item, index)">{{item.region_name}}</li>
        </ul>
        <div class="confirm-btn" @click="next">
            下一步
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemIndex: null,
            regions: {},
            regionSelected: null
        }
    },
    methods: {
        select(item, index) {
            this.regionSelected = item;
            this.itemIndex = index;
        },
        next() {
            if (this.regionSelected == null) {
                alert("请选择一个大区");
            } else {
                this.$store.commit('selectRegion', this.regionSelected);
                this.$router.push({
                    path: '/service/center',
                    query: { id: this.$route.query.id }
                })
            }
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/region', {
                params: {
                    id: this.$route.query.id,
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    this.regions = res.data.result;
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>