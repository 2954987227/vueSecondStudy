<template>
    <div class="tab-bar-item"
         @click="itemClick"
         :style="titleStyle()">
        <slot name="icon">
            <div class="iconfont icontabbarhome"></div>
        </slot>
        <slot name="title">
            <div>首页</div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
          path: {
              type: String,
              default: '/'
          },
          titleColor: {
              type: String,
              default: 'red'
          }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            },
            isActive() {
                return this.$route.path.indexOf(this.path) != -1
            },
            titleStyle() {
                return this.isActive() ? {color: this.titleColor} : {}
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        font-size: 14px;
        text-align: center;
    }

    .tab-bar-item .iconfont {
        font-size: 24px;
        margin-top: 3px;
        margin-bottom: -2px;
    }
</style>