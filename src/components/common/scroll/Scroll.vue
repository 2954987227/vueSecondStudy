<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0,
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: true,
                pullUpLoad: this.pullUpLoad
            });

            console.log(this.scroll);

            //监听滑动
            this.scroll.on('scroll', position => {
                this.$emit('scroll', position)
            })

            //监听下拉加载更多
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        },
        methods: {
            refresh() {
                console.log('refresh...');
                this.scroll && this.scroll.refresh()
            },
            finishPullUp() {
                console.log('finishPullUp...');
                this.scroll && this.scroll.finishPullUp()
            },
            scrollTo(x, y, delay=300) {
                console.log('scrollTo...');
                this.scroll && this.scroll.scrollTo(x, y, delay)
            }
        }
    }
</script>

<style scoped>

</style>