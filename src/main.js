import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueScrollReveal from "vue-scroll-reveal";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VueScrollReveal);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
