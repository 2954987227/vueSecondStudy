import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'assets/img/tabbar/iconfont.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'


Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//消息弹框
Vue.use(Toast, {
    type: 'center',
    duration: 1000,
    // wordWrap: true,
    // width: '150px'
})

//图片懒加载
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})

//解决移动端点击三百秒延迟问题
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
