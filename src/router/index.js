import Vue from 'vue'
import VueRouter from 'vue-router'

const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('views/home/Home')
    },
    {
        path: '/category',
        component: () => import('views/category/Category')
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail',
        component: () => import('views/detail/Detail')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
