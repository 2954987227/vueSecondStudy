<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <tab-control ref="tabControl02" class="fixed"
                     v-show="isTabFixed"
                     @tabClick="tabClick"
                     :titles="tabControlTitles"/>
        <scroll class="content" ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :bannersList="banners.list" @imageLoad="getOffsetTop_imgLoad"/>
            <home-recommend :recommendList="recommends.list" @imageLoad="getOffsetTop_imgLoad"/>
            <home-feature/>
            <tab-control ref="tabControl01" @tabClick="tabClick" :titles="tabControlTitles"/>
            <goods-list :list="showGoodsList" />
        </scroll>
        <back-top v-show="isShow" @click.native="btnClick"/>
    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommend from './childComps/HomeRecommend'
    import HomeFeature from './childComps/HomeFeature'

    import NavBar from 'components/common/navBar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMultidata, getHomeGoods} from "network/home";
    import {debounce} from 'common/utils'


    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goodsImgLoadListener: null,
                tabControlOffsetTop: 0,
                tabControlIndex: 0,
                isLastLoad: true,
                isTabFixed: false,
                goodsList: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                tabControlTitles: ['流行', '新款', '精选'],
                currentType: 'pop',
                isShow: false,
                currentOffsetTop: 0
            }
        },
        components: {
            HomeSwiper,
            NavBar,
            HomeRecommend,
            HomeFeature,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
            console.log('created...');
        },
        destroyed() {
            console.log('destroyed...');
        },
        mounted() {
            this.goodsImgLoadListener = debounce(() => {
                this.$refs.scroll.refresh()
            }, 300)

            this.$bus.$on('goodsImgLoad', this.goodsImgLoadListener)
        },
        methods: {
            /**
             * 网络请求
             */

            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    console.log(res);
                    this.banners = res.data.banner
                    this.recommends = res.data.recommend
                })
            },
            getHomeGoods(type) {
                const page = this.goodsList[type].page + 1
                getHomeGoods(type, page).then(res => {
                    console.log(res);
                    const goodsList = res.data.list
                    this.goodsList[type].list.push(...goodsList)
                    this.goodsList[type].page += 1
                }).catch(err => {
                    console.log(type + '请求失败...');
                })
            },

            /**
             * 事件监听
             */

            contentScroll(position) {
                // if(this.tabControlOffsetTop > -position.y){
                //     this.isTabFixed = false
                // }else {
                //     this.isTabFixed = true
                // }

                // this.isTabFixed = this.tabControlOffsetTop > -position.y ? false : true

                this.isTabFixed = position.y < -this.tabControlOffsetTop
                this.isShow = position.y < -1000
            },
            getOffsetTop_imgLoad() {
                if(this.isLastLoad){
                    this.isLastLoad = false
                }else {
                    this.tabControlOffsetTop = this.$refs.tabControl01.$el.offsetTop
                }
            },
            tabClick(index) {
                switch(index){
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }

                this.$refs.tabControl01.currentIndex = index
                this.$refs.tabControl02.currentIndex = index
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.finishPullUp()
            },
            btnClick() {
                this.$refs.scroll.scrollTo(0, 0, 200)
            }
        },
        computed: {
            showGoodsList() {
                return this.goodsList[this.currentType].list
            }
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.currentOffsetTop, 0)
            this.$refs.scroll.refresh()
            console.log('activated...');
        },
        deactivated() {
            this.currentOffsetTop = this.$refs.scroll.scroll.y
            // console.log(this.$refs.scroll.scroll.y);
            this.$bus.$off('goodsImgLoad', this.goodsImgLoadListener)
            console.log('deactivated...');
        }
    }
</script>

<style scoped>
    #home {
        height: 100vh;
    }

    .home-nav {
        background-color: deeppink;
        color: #ffffff;
    }

    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .fixed {
        position: relative;
        z-index: 9;
    }
</style>