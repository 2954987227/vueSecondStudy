<template>
    <div id="detail">
        <detail-nav-bar @itemClick="navBarClick" ref="navBar"/>
        <scroll ref="scroll" class="content" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :img-list="topImages" @imageLoad="oneLoad"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shopInfo"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="manyLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo" @imageLoad="manyLoad"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :list="recommendInfo"/>
        </scroll>
        <back-top v-show="isShowBackTop" @click.native="backTop"/>
        <detail-bottom-bar @addToCart="addToCart"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import {imgListenerMixin, backTopMixin} from 'common/mixin'
    import {debounce} from 'common/utils'

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shopInfo: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommendInfo: [],
                offsetTops: [],
                titleRefresh: null
            }
        },
        components: {
            DetailParamInfo,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            Scroll,
            BackTop,
            DetailBottomBar
        },
        created() {
            this.iid = this.$route.query.iid

            this.setBackTopHeight(1500)

            getDetail(this.iid).then(res => {
                console.log(res);

                const result = res.result

                //轮播图
                this.topImages = result.itemInfo.topImages

                //商品详情
                this.goods = new Goods(result.columns, result.itemInfo, result.shopInfo.services)

                //店铺详情
                this.shopInfo = new Shop(result.shopInfo)

                //穿着效果
                this.detailInfo = result.detailInfo

                //商品参数
                this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)

                //评论
                this.commentInfo = result.rate.list[0]
            })

            getRecommend().then(res => {
                console.log(res);
                this.recommendInfo = res.data.list
            })

        },
        mixins: [imgListenerMixin, backTopMixin],
        mounted() {
            this.titleRefresh = debounce(() => {
                if(this.$refs.params && this.$refs.comment && this.$refs.recommend)
                    this.$nextTick(this.getTitleOffsetTop)
            },1000)
        },
        methods: {
            manyLoad() {
                this.imgListener()
                this.titleRefresh()
            },
            oneLoad() {
                this.$refs.scroll.refresh()
                this.getTitleOffsetTop()
            },
            getTitleOffsetTop() {
                this.titleOffsetTop = []
                this.titleOffsetTop.push(0)
                this.titleOffsetTop.push(this.$refs.params.$el.offsetTop)
                this.titleOffsetTop.push(this.$refs.comment.$el.offsetTop)
                this.titleOffsetTop.push(this.$refs.recommend.$el.offsetTop)
                this.titleOffsetTop.push(Number.MAX_VALUE)
                console.log(this.titleOffsetTop);
            },
            navBarClick(index) {
                this.$refs.scroll.scrollTo(0, -this.titleOffsetTop[index], 100)
            },
            contentScroll(position) {
                this.listenerShowBackTop(-position.y)

                const y = -position.y
                const length = this.titleOffsetTop.length
                for(let i = 0; i < length; i++){
                    const top = this.titleOffsetTop[i]
                    const bottom = this.titleOffsetTop[i+1]
                    if(y > top && y < bottom){
                        this.$refs.navBar.currentIndex = i
                        break
                    }
                }
            },
            addToCart() {
                if(this.topImages[0] && this.goods.title && this.goods.desc && this.goods.price) {
                    const product = {}
                    product.image = this.topImages[0]
                    product.title = this.goods.title
                    product.desc = this.goods.desc
                    product.price = this.goods.nowPrice
                    product.iid = this.iid

                    console.log(product);

                    this.$store.dispatch('addCart', product).then(res => {
                        this.$toast(res)
                    })
                }

                // console.log(this.$store.state.cartList);
                // console.log(this.$store.getters.getCartListLength);
                // console.log(this.$store.getters.getCartList);
            }
        },
        destroyed() {
            this.$bus.$off('goodsImgLoad', this.imgListener)
        }
    }
</script>

<style scoped>
    #detail {
        height: 100vh;

        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px - 49px);

        background-color: #fff;

        overflow: hidden;
    }
</style>