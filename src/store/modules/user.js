import firebase from "../../utils/firebase";

const state = {
  user: {},
  favorite: [],
  userDataLocalStorage: JSON.parse(localStorage.getItem("user")),
  newUserDisplayName: "",
  isLoggedIn: false,
};

const getters = {
  userData: (state) => state.user,
  userDataFavorite: (state) => state.favorite,
  newUserDisplayName: (state) => state.newUserDisplayName,
};

const actions = {
  getUserDataFavorite({ commit }) {
    console.log(state.userDataLocalStorage);
    firebase
      .firestore()
      .collection("users")
      .doc(
        state.userDataLocalStorage.useruid ||
          firebase.auth().currentUser.uid ||
          state.user.uid
      )
      .collection("favorites")
      .onSnapshot((querySnapshot) => {
        const movieFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        commit("setUserDataFavorite", movieFirebase);
      });
  },
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
  setNewUserDisplayName: (state, newUserDisplayName) =>
    (state.newUserDisplayName = newUserDisplayName),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
