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
            {{}}
        </div>
        <ul class="region">
            <li v-for="(item, index) in regions" :class="{activated: itemIndex == index}" @click="select (item, index)">{{item.region_name}}</li>
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
                    res.data.result.forEach((item)=>{
                        if(item.region_id == region.region_id){
                            this.centers.push(item);
                        }
                        console.log(this.centers)
                    })
                    return;
                }
                alert(res.data.status.msg);
            })
    }
}
</script>