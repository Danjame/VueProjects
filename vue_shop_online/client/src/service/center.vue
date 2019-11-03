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
        margin-right: 16px;
        & li {
            list-style: none;
            box-sizing: border-box;
            width: 344px;
            height: 168px;
            margin-bottom: 16px;
            padding: 24px;
            border-radius: 12px;
            background: white;
            & .centerName{
                margin-bottom: 10px;
                font-size: 22px;
            }
            & .centerAdd{
                line-height: 28px;
                font-size: 20px;
            }
            & .centerTele{
                line-height: 28px;
                font-size: 20px;
            }
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
            {{region.region_name}}
        </div>
        <ul class="region">
            <li v-for="(item, index) in centers" :class="{activated: itemIndex == index}" @click="select (item, index)">
                <p class="centerName">{{item.center_name}}</p>
                <p class="centerAdd">{{item.center_address}}</p>
                <p class="centerTele">{{item.center_tele}}</p>
            </li>
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
            region: this.$store.state.service.region,
            centers: []
        }
    },
    methods: {
        select(item, index) {
            this.itemIndex = index;
        },
        next() {
            this.$router.push({
                path: '/center',
                query: { id: this.$route.query.id }
            })
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/center', {
                params: {
                    id: this.$route.query.id,
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    res.data.result.forEach(item => {
                        if (item.region_id == this.region.region_id) {
                            this.centers.push(item);
                        }
                    })
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>