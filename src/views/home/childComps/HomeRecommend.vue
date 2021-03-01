<template>
    <div class="recommend">
        <div v-for="(item, index) in recommendList" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" @load="imageLoad">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    import {getOffsetTop_imgLoad} from 'common/mixin'

    export default {
        name: "HomeRecommend",
        props: {
            recommendList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        mixins: [getOffsetTop_imgLoad]
    }
</script>

<style scoped>
    .recommend {
        display: flex;

        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
    }

    .recommend-item {
        flex: 1;

        text-align: center;
        font-size: 12px;


    }

    .recommend-item img {
        width: 70px;
        height: 70px;

        margin-bottom: 10px;
    }

    .recommend-item a {
        text-decoration: none;
    }
</style>