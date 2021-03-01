<template>
    <swiper ref="swiper">
        <swiper-item v-for="(item, index) in bannersList" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'
    import {getOffsetTop_imgLoad} from 'common/mixin'

    export default {
        name: "HomeSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            bannersList: {
                type: Array,
                default() {
                    return []
                }
            }
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
            },
        }
    }
</script>

<style scoped>

</style>