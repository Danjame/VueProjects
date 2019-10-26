<style lang="less" scoped>
.goods {
    &-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: auto;
    }

    &-wrap {
        display: flex;
        height: 100%;
        flex-direction: row;
        flex-wrap: nowrap;
        transition: transform 0.3s ease-out;
    }

    &-item {
        margin: 16px 8px;
        min-width: 304px;
        color: #333;
        text-align: center;

        &:first-child {
            margin-left: 30px
        }

        &-pic {
            width: 100%;
            min-height: 376px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        img {
            /* margin-bottom: 16px; */
            border-radius: 10px;
            max-width: 100%;
            max-height: 330px;
        }

        &.active {
            width: 304px;
        }

        &.active img {
            max-width: 304px;
            max-height: 376px;
        }

        &-title {
            height: 100px;
            margin-top: 16px;
            font-size: 24px;
        }

        &-price {
            margin-top: 16px;
            font-size: 26px;
        }

        &-buybtn {
            width: 264px;
            height: 56px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 30px;
            border-radius: 28px;
            line-height: 54px;
            background: #f1d500;
            font-size: 22px;
            color: #622d00;
        }
    }
}
</style>
<template>
    <div class="goods-container" @touchstart="swipeStart" @touchmove="swipeMove" @touchend="swipeEnd">
        <div class="goods-wrap" :style="transformObj">
            <div class="goods-item" v-for="(item, index) in list" v-bind:class="{ active: index === slideIndex}">
                <div class="goods-item-pic">
                    <img v-bind:src="item.imgs[0]" />
                </div>
                <div class="goods-item-title">{{item.good_title}}</div>
                <div class="goods-item-price">￥{{item.range}}</div>
                <router-link class="goods-item-buybtn" tag="div" :to="{ path: '/detail', query:{id: item.good_id, price_range:item.range}}">立即购买</router-link>
            </div>
        </div>
    </div>
</template>
<script>
const isMobile = 'ontouchstart' in window;

function docTouchStart(e) {
    // e.preventDefault();
}

function getClientX(e) {
    if (!(e.touches || e.changedTouches)) return;
    return (e.touches[0] || e.changedTouches[0]).clientX;
}
const TimerUtils = (function() {
    let _timer;
    let _func;
    let _interval;
    return {
        schedule: function(func, interval) {
            _func = func;
            _interval = interval;
            return this;
        },
        start: function() {
            _timer = setInterval(_func, _interval);
            return this;
        },
        stop: function() {
            if (_timer) {
                clearInterval(_timer);
                _timer = null;
            }
            return this;
        }
    }
})();

export default {
    name: 'slider',
    props: ['datas', 'params'],
    data() {
        return {
            list: [],
            slideIndex: 0,
            slideIndexTemp: 0,
            startX: 0,
            moveStartTime: 0,
            manualOffset: 0,
            playTimer: null,
            winWidth: window.innerWidth,
            slideParams: {
                minMoveDistance: 50, // 最小滑动距离 单位: 像素
                minMoveSpeed: 200, // 最小滑动速度 单位: 像素/秒
                autoPlay: false, // 是否自动播放
                autoPlayInterval: 2000 // 自动播放时间间隔
            }
        }
    },
    mounted: function() {
        this.list = this.datas;
        for (var paramKey in this.params) {
            if (this.params.hasOwnProperty(paramKey)) {
                this.slideParams[paramKey] = this.params[paramKey];
            }
        }
        if (this.slideParams.autoPlay) {
            this.playTimer = TimerUtils.schedule(() => {
                this.slideIndex = (this.slideIndex + 1) % this.itemCount;
            }, this.slideParams.autoPlayInterval).start();
        }
        window.addEventListener('resize', () => {
            this.winWidth = window.innerWidth;
        });
    },
    computed: {
        priceCount: function() {
            return
        },
        itemCount: function() {
            return this.datas.length;
        },
        transformObj: function() {
            let width = -1 * this.winWidth * this.slideIndex + this.manualOffset;
            width = width + (60 * this.slideIndex);
            const translateProp = `translate3d(${width}px, 0, 0)`;
            const obj = {
                '-webkit-transform': translateProp,
                'transform': translateProp,
            };
            if (this.manualOffset != 0) {
                obj.transition = 'none';
            }
            return obj;
        }
    },
    methods: {
        slideNext: function() {
            if (this.slideIndex == this.itemCount - 1) return;
            this.slideIndex++;
        },
        slidePrev: function() {
            if (this.slideIndex == 0) return;
            this.slideIndex--;
        },
        slideTo: function(index) {
            if (index < 0 || index > this.itemCount - 1) return;
            this.slideIndex = index;
        },
        swipeStart: function(e) {
            document.addEventListener('touchmove', docTouchStart, { passive: false });
            this.startX = getClientX(e);
            this.playTimer && this.playTimer.stop(); // 手动操作开始后关闭自动轮播计时
        },
        swipeMove: function(e) {
            if (!this.startX) return; // PC: 如果直接mousemove则不做处理
            e.preventDefault(); // PC: 阻止默认行为, 防止产生拖拽图片
            var moveX = getClientX(e);
            this.manualOffset = moveX - this.startX;
            if (!this.moveStartTime) {
                this.moveStartTime = new Date().getTime();
            }
        },
        swipeEnd: function(e) {
            document.removeEventListener('touchmove', docTouchStart, { passive: false });
            let endX = getClientX(e);
            let moveEndTime = new Date().getTime();
            let moveDistance = endX - this.startX;
            let moveDistanceAbs = Math.abs(moveDistance);
            let moveDuration = Math.abs(moveEndTime - this.moveStartTime);
            let moveSpeed = moveDistanceAbs / (moveDuration / 1000);
            this.manualOffset = 0;
            this.startX = 0;
            this.moveStartTime = 0;
            this.playTimer && this.playTimer.start(); // 手动操作结束后重新启动自动轮播计时
            if (moveDistanceAbs > this.slideParams.minMoveDistance && moveSpeed > this.slideParams.minMoveSpeed) {
                moveDistance < 0 ? this.slideNext() : this.slidePrev();
            }
        }
    }
}
</script>