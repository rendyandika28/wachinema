import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import VueToast from "vue-toast-notification";
import store from "./store";
import VueYoutube from "vue-youtube";

import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueYoutube);
Vue.use(VueSweetalert2);
Vue.use(VueToast);
let instance = Vue.$toast.open("You did it!");
//Vue.$toast.open({/* options */});

// Force close specific toast
instance.close();
// Close all opened toast immediately
Vue.$toast.clear();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
