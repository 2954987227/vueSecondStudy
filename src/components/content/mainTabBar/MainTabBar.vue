<template>
    <div class="main-tab-bar">
        <tab-bar>
            <tab-bar-item path="/home"></tab-bar-item>
            <tab-bar-item path="/category" titleColor="#aaa">
                <div slot="icon" class="iconfont iconTABbar1"></div>
                <div slot="title">分类</div>
            </tab-bar-item>
            <tab-bar-item path="/cart" titleColor="green">
                <div slot="icon" class="iconfont iconicontabbarshoppingup"></div>
                <div slot="title">购物车</div>
            </tab-bar-item>
            <tab-bar-item path="/profile" titleColor="rgb(10,100,5)">
                <div slot="icon" class="iconfont iconTABbar"></div>
                <div slot="title">我的</div>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script>
    import TabBar from 'components/common/tabbar/TabBar'
    import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
        name: "MainTabBar",
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>