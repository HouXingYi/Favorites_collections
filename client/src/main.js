// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

//vuexStart
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    userName:''
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, userName) {
      state.userName = userName;
    }
  }
});
Vue.prototype.$store = store;
//vuexEnd

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
