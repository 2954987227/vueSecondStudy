import {ADD_TO_CART, ADD_COUNTER} from './mutations-types'

export default {
    [ADD_COUNTER](state, payLoad) {
        payLoad.counter += 1
    },
    [ADD_TO_CART](state, payLoad) {
        payLoad.checked = true
        state.cartList.push(payLoad)
    }
}