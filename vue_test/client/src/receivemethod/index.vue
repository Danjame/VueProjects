<style lang="less" scoped>
* {
    color: black;
}

.title {
    height: 110px;
    line-height: 110px;
    font-size: 30px
}

.method {
    box-sizing: border-box;
    height: 150px;
    margin: auto 3%;
    margin-bottom: 20px;
    padding: 5px;
    border-radius: 10px;
    background-color: white;
    font-size: 22px;
}

.selected {
    background-color: #f1d548;
    color: #3e0707;
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

</style>
<template>
    <div>
        <div class="title">选择收货方式</div>
        <div class="method" v-html = "content":class="{selected: itemIndex == index }" v-for = "(content, index) in datas" @click = "select(index)">{{content}}</div>
        <div class = "confirm-btn">
            <div v-if = "itemIndex == null">下一步</div>
           <router-link v-if = "itemIndex == 0" tag="div" :to="{path: '/address', query: {id: this.$route.query.id}}">下一步
           </router-link>
            <router-link v-if = "itemIndex == 1" tag="div" :to="{path: '/shops', query: {id: this.$route.query.id}}">下一步
           </router-link>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
        	datas: ["<p>送货上门</p><p>10公里以内的用户门店有货24小时内送达</p>", "<p>门店自提</p><p>您可以到附近门店自提</p>"],
        	itemIndex: null,
            information:{}
        	}
        },
    methods: {
        select(index) {
            this.itemIndex = index;
        }
    },
    mounted() {
        this.axios
            .get('/api/goods/', {
                params: {
                    id: this.$route.query.id
                },
            })
            .then(res => {
                if (res.data.status.code === '200') {
                    console.log(res.data.data);

                    return;
                };
                return;
            });
    }
}
</script>