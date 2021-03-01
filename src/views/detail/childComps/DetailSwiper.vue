<template>
    <swiper ref="swiper" v-if="imgList.length" class="detail-swiper">
        <swiper-item v-for="(item, index) in imgList" :key="index">
            <img :src="item" @load="imageLoad">
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'
    import {getOffsetTop_imgLoad} from 'common/mixin'

    export default {
        name: "DetailSwiper",
        props: {
            imgList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        mixins: [getOffsetTop_imgLoad],
        methods: {
            stopTimer() {
                this.$refs.swiper.stopTimer()
            },
            startTimer() {
                if (this.$refs.swiper) {
                    this.$refs.swiper.startTimer()
                }
            }
        }
    }
</script>

<style scoped>
    .detail-swiper {
        height: 280px;
        text-align: center;
        /*overflow: hidden;*/
    }
</style>