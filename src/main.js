import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import VueToast from "vue-toast-notification";
import store from "./store";
import VueYoutube from "vue-youtube";

import firebase from "./utils/firebase";

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

let app;
firebase.auth().onAuthStateChanged((authUser) => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
  if (authUser) {
    if (authUser.displayName) {
      store.commit("setUserData", authUser);
      localStorage.setItem(
        "user",
        JSON.stringify({
          useruid: authUser.uid,
          username: authUser.displayName,
          email: authUser.email,
        })
      );
    } else {
      const newUser = Object.assign({}, authUser);
      newUser.displayName = store.getters.newUserDisplayName;
      // console.log("user obj", newUser);
      store.commit("setUserData", newUser);
      localStorage.setItem(
        "user",
        JSON.stringify({
          useruid: newUser.uid,
          username: newUser.displayName || store.getters.newUserDisplayName,
          email: newUser.email,
        })
      );
    }
  } else {
    store.user = null;
  }
});
