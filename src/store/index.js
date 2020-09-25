import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user";

// Load the vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    user,
  },
});
