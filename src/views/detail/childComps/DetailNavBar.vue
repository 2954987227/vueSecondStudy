<template>
    <div class="detail-nav-bar">
        <nav-bar>
            <div slot="left" class="left" @click="backHome">
                <img src="~assets/img/common/back.svg">
            </div>
            <div slot="center" class="center">
                <div v-for="(item, index) in titles"
                     class="center-item"
                     @click="itemClick(index)"
                     :class="{active: currentIndex === index}">
                    {{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar'

    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('itemClick', index)
            },
            backHome() {
                // this.$router.go(-1)
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .detail-nav-bar {
        position: relative;
        z-index: 9;

        background-color: white;
    }

    .left img{
        width: 18px;
        height: 18px;
        margin-top: 13px;
    }

    .center {
        display: flex;
    }

    .center-item {
        flex: 1;

        font-size: 13px;
    }

    .active {
        color: red;
    }
</style>