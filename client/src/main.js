import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import jsonp  from 'jsonp'
import UICom  from 'components/index'
import DomPortal from 'vue-dom-portal'
//关闭提示
Vue.config.productionTip = false;
//全局方法
Vue.prototype.$ajax = axios
Vue.prototype.$ajax.jsonp = jsonp
Vue.prototype.$store = store;
//全局dom转移渲染指令
Vue.use(DomPortal)
//自定义组件
Vue.use(UICom);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data () {
    return {
      Bus: new Vue()
    }
  }
})
