import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import Global from '@/store/global.vue'
import '../src/assets/icons/iconfont.css'

Vue.prototype.$Global = Global;
Vue.use(Vant);

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
