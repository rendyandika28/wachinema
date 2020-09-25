import firebase from "../../utils/firebase";

const state = {
  user: {},
};

const getters = {
  userData: (state) => state.user,
};

const actions = {
  getUserData({ commit }) {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // this.user = authUser;
        commit("setUserData", authUser);
        console.log(authUser);
      } else {
        this.user = null;
      }
    });
  },
};

const mutations = {
  setUserData: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
