import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
const token = store.getters["Auth/token"];
if (token.access_token) {
  console.log(token)
  Vue.prototype.$http.defaults.headers.common.Accept = "application/json";
  Vue.prototype.$http.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;

}

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

