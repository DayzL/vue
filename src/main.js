import Vue from "vue";
import App from "./App.vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import vuetify from './plugins/vuetify';
import VueMask from "v-mask";
Vue.use(VueMask);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;



new Vue({
  el: "#app",
  vuetify,
  render: h => h(App)
});

