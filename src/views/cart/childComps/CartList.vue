<template>
    <div class="cart-list">
        <cart-list-item v-for="(item, index) in getCartList" :key="index" :item-info="item"/>
    </div>
</template>

<script>
    import CartListItem from './CartListItem'

    import {mapGetters} from 'vuex'

    export default {
        name: "CartList",
        components: {
            CartListItem
        },
        computed: {
            ...mapGetters({
                list: 'getCartList'
            }),
            getCartList() {
                console.log(this.list);
                return this.list
            }
        }
    }
</script>

<style scoped>

</style>