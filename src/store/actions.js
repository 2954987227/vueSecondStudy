import {ADD_TO_CART, ADD_COUNTER} from './mutations-types'

export default {
    addCart(context, payLoad) {
        const product = context.state.cartList.find(item => item.iid === payLoad.iid)

        return new Promise((res, rej) => {
            if(product) {
                context.commit(ADD_COUNTER, product)
                res('商品数量加一')
            }else {
                payLoad.counter = 1
                context.commit(ADD_TO_CART, payLoad)
                res('添加新商品')
            }
        })
    }
}