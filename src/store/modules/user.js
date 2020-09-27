import firebase from "../../utils/firebase";

const state = {
  user: {},
  favorite: [],
  // userLocalStorage: JSON.parse(localStorage.getItem("user")),
};

const getters = {
  userData: (state) => state.user,
  userDataFavorite: (state) => state.favorite,
};

const actions = {
  getUserData({ commit }) {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        commit("setUserData", authUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            useruid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        this.user = null;
      }
    });
  },
  // updateUserData({ commit }) {
  //   commit("setDisplayName");
  // },
  // getUserDataFavorite({ commit }) {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(this.user.uid)
  //     .collection("favorites")
  //     .onSnapshot((querySnapshot) => {
  //       const movieFirebase = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }));
  //       console.log("data vuex", movieFirebase);
  //       commit("setUserDataFavorite", movieFirebase);
  //     });
  // },
};

const mutations = {
  setUserData: (state, user) => (state.user = user),
  setUpdatedUserData: (state, payload) => {
    let user = Object.assign({}, state.user);
    const { displayName, email } = payload;
    if (email) {
      user.email = email;
    }
    if (displayName) {
      user.displayName = displayName;
    }
    state.user = user;
  },
  setUserDataFavorite: (state, favorite) => (state.favorite = favorite),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
