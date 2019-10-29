<style lang="less" scoped>
    *{
    padding: 0;
    margin: 0;
}
.container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;

    & .title{
        margin-top: 32px;
        margin-left: 16px;
        font-size: 28px;
    }

    & .input-wrapper{
        margin-top: 29px;
        margin-left: 16px;
        margin-right: 16px;

        & input{
            width: 100%;
            margin-top: 33px;
            line-height: 30px;
            font-size: 22px;
            color: grey;
            outline: none;
        }

        &-region{
            width: 100%;
            margin-top: 33px;
            line-height: 30px;
            font-size: 22px;
            color: grey;
            &-arrow{
                display: inline-block;
                right: 0;
                position: absolute;
                &-left{
                    display: inline-block;
                    width: 0;
                    height: 0;
                    margin-right: -33px;
                    border: 13px solid transparent;
                    border-left: 13px solid black;
                }
                &-right{
                    display: inline-block;
                    width: 0;
                    height: 0;
                    margin-right: 2px;
                    border: 13px solid transparent;
                    border-left: 13px solid white;
                }
            }
            &-selector{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                position: fixed;
                height: 71px;
                margin-top: -63px;
                left: 16px;
                right: 13px;
                background: white;
                & select{
                    text-align: center;
                    font-size: 20px;
                }
            }
        }

        & hr{
            width: 344px;
            margin: 0 auto;
            margin-top: 7px;
        }
    }
}
.btn {
    width: 264px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 300px;
    background-color: #F1D000;
    text-align: center;
    line-height: 56px;
    font-size: 22px;
    border-radius: 28px;
}

</style>
<template>
    <div class="container">
        <div class="title">填写地址</div>
        <div class="input-wrapper">
            <input type="text" v-model="name" @focus="focusName" @blur="blurName">
            <hr />
            <input type="text" v-model="tele" @focus="focusTele" @blur="blurTele">
            <hr />
            <div class="input-wrapper-region" @click="showSelector">{{regionText}}
                <span class="input-wrapper-region-arrow">
                    <span class="input-wrapper-region-arrow-left"></span>
                    <span class="input-wrapper-region-arrow-right"></span>
                </span>
                <div class="input-wrapper-region-selector" v-show="regionSelector">
                    <span>
                        <div>选择省份</div>
                        <select v-model="province">
                            <option disabled>请选择</option>
                            <option :value="item" v-for="(item, index) in provinces">{{item.name}}</option>
                        </select>
                    </span>
                    <span>
                        <div>选择城市</div>
                        <select v-model="city">
                            <option disabled>请选择</option>
                            <option :value="item" v-for="(item, index) in cities">{{item.name}}</option>
                        </select>
                    </span>
                    <span>
                        <div>选择区/县</div>
                        <select v-model="district">
                            <option disabled>请选择</option>
                            <option :value="item" v-for="(item, index) in districts">{{item.name}}</option>
                        </select>
                    </span>
                </div>
            </div>
            <hr />
            <input type="text" v-model="local" @focus="focusLocal" @blur="blurLocal">
            <hr />
        </div>
        <div class="btn" @click="handleConfirm(name,tele,regionText,local,index)">
            确认修改
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditAddress',
    props: {
        editItem: Object,
    },
    data() {
        return {
            name: '姓名',
            tele: '手机号码',
            local: '详细地址',
            regionText: '区域',
            index: '',
            regionSelector: false,
            province: null,
            city: null,
            district: null,
            provinces: [],
            cities: [],
            districts: [],
            region: [{
                "name": "广东省",
                "value": "440000"
            }, {
                "name": "浙江省",
                "value": "330000"
            }, {
                "name": "吉林省",
                "value": "220000"
            }, {
                "name": "广州市",
                "value": "440100",
                "parent": "440000"
            }, {
                "name": "深圳市",
                "value": "440300",
                "parent": "440000"
            }, {
                "name": "珠海市",
                "value": "440400",
                "parent": "440000"
            }, {
                "name": "杭州市",
                "value": "330100",
                "parent": "330000"
            }, {
                "name": "宁波市",
                "value": "330200",
                "parent": "330000"
            }, {
                "name": "温州市",
                "value": "330300",
                "parent": "330000"
            }, {
                "name": "长春市",
                "value": "220100",
                "parent": "220000"
            }, {
                "name": "吉林市",
                "value": "220200",
                "parent": "220000"
            }, {
                "name": "四平市",
                "value": "220300",
                "parent": "220000"
            }, {
                "name": "海珠区",
                "value": "440105",
                "parent": "440100"
            }, {
                "name": "天河区",
                "value": "440106",
                "parent": "440100"
            }, {
                "name": "白云区",
                "value": "440111",
                "parent": "440100"
            }, {
                "name": "罗湖区",
                "value": "440303",
                "parent": "440300"
            }, {
                "name": "福田区",
                "value": "440304",
                "parent": "440300"
            }, {
                "name": "南山区",
                "value": "440305",
                "parent": "440300"
            }, {
                "name": "香洲区",
                "value": "440402",
                "parent": "440400"
            }, {
                "name": "斗门区",
                "value": "440403",
                "parent": "440400"
            }, {
                "name": "金湾区",
                "value": "440404",
                "parent": "440400"
            }, {
                "name": "上城区",
                "value": "330102",
                "parent": "330100"
            }, {
                "name": "下城区",
                "value": "330103",
                "parent": "330100"
            }, {
                "name": "江干区",
                "value": "330104",
                "parent": "330100"
            }, {
                "name": "海曙区",
                "value": "330203",
                "parent": "330200"
            }, {
                "name": "江东区",
                "value": "330204",
                "parent": "330200"
            }, {
                "name": "江北区",
                "value": "330205",
                "parent": "330200"
            }, {
                "name": "鹿城区",
                "value": "330302",
                "parent": "330300"
            }, {
                "name": "龙湾区",
                "value": "330303",
                "parent": "330300"
            }, {
                "name": "瓯海区",
                "value": "330304",
                "parent": "330300"
            }, {
                "name": "南关区",
                "value": "220102",
                "parent": "220100"
            }, {
                "name": "宽城区",
                "value": "220103",
                "parent": "220100"
            }, {
                "name": "朝阳区",
                "value": "220104",
                "parent": "220100"
            }, {
                "name": "昌邑区",
                "value": "220202",
                "parent": "220200"
            }, {
                "name": "龙潭区",
                "value": "220203",
                "parent": "220200"
            }, {
                "name": "船营区",
                "value": "220204",
                "parent": "220200"
            }, {
                "name": "铁西区",
                "value": "220302",
                "parent": "220300"
            }, {
                "name": "铁东区",
                "value": "220303",
                "parent": "220300"
            }, {
                "name": "梨树县",
                "value": "220322",
                "parent": "220300"
            }, ]
        }
    },
    methods: {
        showSelector() {
            this.regionSelector = true;
        },
        handleConfirm(arg1, arg2, arg3, arg4, arg5) {
            if (this.name == "姓名" || this.tele == "手机号码" || this.local == "详细地址" || !this.district) {
                alert("请填写完整信息")
            } else {
            	const {name, tele, region, local, index} = {name:arg1, tele:arg2, region:arg3, local: arg4, index: arg5};
                this.$emit("edit", {name, tele, region, local, index});
            }
        },
        focusName() {
            if (this.name == "姓名") {
                this.name = ""
            } else {
                return
            }
        },
        focusTele() {
            if (this.tele == "手机号码") {
                this.tele = ""
            } else {
                return
            }
        },
        focusLocal() {
            if (this.local == "详细地址") {
                this.local = ""
            } else {
                return
            }
        },
        blurName() {
            if (this.name == "") {
                this.name = "姓名"
            } else {
                return
            }
        },
        blurTele() {
            if (this.tele == "") {
                this.tele = "手机号码"
            } else {
                return
            }
        },
        blurLocal() {
            if (this.local == "") {
                this.local = "详细地址"
            } else {
                return
            }
        }
    },
    mounted() {
        this.region.forEach((item, index) => {
            if (!item.parent) {
                this.provinces.push(item);
            }
        })
    },
    watch: {
        editItem: function() {
            this.name = this.editItem.name;
            this.tele = this.editItem.tele;
            this.local = this.editItem.local;
            this.regionText = this.editItem.region;
            this.index = this.editItem.index;
        },
        province: function() {
            this.cities = [];
            this.region.forEach((item, index) => {
                if (item.parent && item.parent == this.province.value) {
                    this.cities.push(item);
                }
            })
        },
        city: function() {
            this.districts = [];
            this.region.forEach((item, index) => {
                if (item.parent && item.parent == this.city.value) {
                    this.districts.push(item);
                }
            })
        },
        district: function() {
            this.regionText = `${this.province.name}${this.city.name}${this.district.name}`;
            this.regionSelector = false;
        }
    },
}
</script>