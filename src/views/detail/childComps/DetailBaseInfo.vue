<template>
    <div class="detail-goods-info">
        <div class="goods-desc">{{goods.title}}</div>
        <div class="goods-price">
            <span class="price">{{goods.price}}</span>
            <span class="oldPrice">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.discount}}</span>
        </div>
        <div class="columns">
            <div class="left">{{getColumns(0)}}</div>
            <div class="center">{{getColumns(1)}}</div>
            <div class="right">{{getLastServicesItem}}</div>
        </div>
        <div class="services">
            <div class="services-item" v-for="(item, index) in getServicesList">
                <img :src="item.icon">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            goods: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                lastServicesItem: ''
            }
        },
        created() {

        },
        computed: {
            getServicesList() {
                const services = this.goods.services
                const servicesList = []
                if(services) {
                    for(let i = 0; i < services.length - 1; i++) {
                        servicesList.push(services[i])
                    }
                }

                return servicesList
            },

            getColumns() {
                return function (index) {
                    return this.goods.columns && this.goods.columns[index]
                }
            },

            getLastServicesItem() {
                return this.goods.services && this.goods.services[this.goods.services.length - 1].name
            }
        }
    }
</script>

<style scoped>
    .goods-desc {
        margin: 10px 5px;
    }

    .price {
        color: red;
        font-size: 20px;
        margin-left: 10px;
    }

    .oldPrice {
        color: #777777;
        font-size: 7px;
        margin: 0 3px;
        text-decoration: line-through;
    }

    .discount {
        color: white;
        background-color: red;
        padding: 3px;
        border-radius: 8px;
        font-size: 7px;
        position: relative;
        bottom: 7px;
    }

    .columns {
        display: flex;
    }

    .columns div {
        flex: 1;

        font-size: 10px;
        color: #777777;

        margin-top: 15px;
        padding: 3px 5px;
        border-bottom: 3px solid rgba(100,100,100,.1);
    }

    .columns .center {
        text-align: center;
    }

    .columns .right {
        text-align: right;
    }

    .services {
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        margin: 20px 0;
    }

    .services-item {
        font-size: 10px;
    }

    .services-item img {
        width: 12px;
        height: 12px;

        position: relative;
        top: 2px;
    }
</style>