import {debounce} from "common/utils";

export const getOffsetTop_imgLoad = {
    data() {
        return {
            isLoad: true,
        }
    },
    methods: {
        imageLoad() {
            if(this.isLoad){
                console.log('getOffsetTop_imgLoad...');
                this.$emit('imageLoad')
                this.isLoad = false
            }
        }
    }
}

export const imgListenerMixin = {
    data() {
        return {
            // refresh: null,
            imgListener: null
        }
    },
    mounted() {
        console.log('imgListenerMixin...');

        let refresh = debounce(this.$refs.scroll.refresh, 300)

        this.imgListener = () => {
            refresh()
        }

        this.$bus.$on('goodsImgLoad', this.imgListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
            backTopHeight: 0
        }
    },

    methods: {
        setBackTopHeight(height) {
            this.backTopHeight = height
        },
        listenerShowBackTop(positionY){
            this.isShowBackTop = this.backTopHeight < positionY
        },
        backTop() {
            this.$refs.scroll.scrollTo(0, 0)
        }
    }
}