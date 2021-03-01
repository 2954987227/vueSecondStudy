<template>
    <div id="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{$store.getters.getCartListLength}})</div>
        </nav-bar>
        <scroll class="content" ref="scroll">
            <cart-list/>
        </scroll>
        <bottom-bar class="bottom-bar"/>
    </div>
</template>

<script>
    import CartList from './childComps/CartList'
    import BottomBar from './childComps/BottomBar'

    import NavBar from 'components/common/navBar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'

    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            Scroll,
            BottomBar
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    #cart {
        height: 100vh;
        /*width: 100%;*/
    }

    .nav-bar {
        background-color: deeppink;
        color: white;
    }

    .content {
        height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
    }


</style>