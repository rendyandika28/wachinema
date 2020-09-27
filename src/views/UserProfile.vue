<template>
  <div class="userprofile">
    <Header />
    <div class="userprofile__content">
      <div class="userprofile__data">
        <h1>{{ displayName }}</h1>
        <h3>{{ email }}</h3>
        <form action="">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              v-model="formUser.displayName"
              maxlength="25"
              @keydown.space.prevent
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" v-model="formUser.email" />
          </div>
          <Button
            @button-click="updateUserData"
            title="save changes"
            bcolor="#800000"
            size
          />
        </form>
      </div>
      <div class="userprofile__favorite">
        <h2>List of my favorite movies</h2>
        <div class="favoritemovie__wrapper">
          <FavoriteMovie
            :key="movie.id"
            :movieId="movie.id"
            v-for="movie in favoriteMovieData"
            :title="movie.data.title"
            :imgUrl="movie.data.imgUrl"
          ></FavoriteMovie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Button from "../components/Button";
import FavoriteMovie from "../components/FavoriteMovie";
import firebase from "../utils/firebase";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "UserProfile",
  components: {
    Header,
    Button,
    FavoriteMovie,
  },
  data() {
    return {
      formUser: {
        displayName: "",
        email: "",
      },
      favoriteMovieData: [],
      userDataLocalStorage: {},
    };
  },
  methods: {
    ...mapActions(["getUserData"]),
    ...mapMutations(["setUpdatedUserData"]),
    updateUserData() {
      const user = firebase.auth().currentUser;
      if (this.formUser) {
        if (this.formUser.displayName) {
          user
            .updateProfile({
              displayName: this.formUser.displayName,
            })
            .then(function () {})
            .catch(function (error) {
              console.log("name", error.message);
            });
        }

        if (this.formUser.email) {
          const credential = firebase.auth.EmailAuthProvider.credential(
            this.userData.email,
            this.userData.uid
          );
          user.reauthenticateWithCredential(credential).then((user) => {
            console.log("email", user);
          });
          // user
          //   .updateEmail(this.formUser.email)
          //   .then(function () {
          //     // Update successful.
          //   })
          //   .catch(function (error) {
          //     // An error happened.
          //     console.log("email", error.message);
          //   });
        }
        this.$store.commit("setUpdatedUserData", this.formUser);

        this.$swal("", "Data Changed", "success");
        this.formUser.displayName = "";
        this.formUser.email = "";
      }
    },
  },
  created() {
    this.getUserData();
    this.userDataLocalStorage = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    ...mapGetters(["userData"]),
    displayName() {
      return this.userData.displayName || this.userDataLocalStorage.username;
    },
    email() {
      return this.userData.email;
    },
  },
  mounted() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.userDataLocalStorage.useruid)
      .collection("favorites")
      .orderBy("timestamp", "desc")

      .onSnapshot((querySnapshot) => {
        this.favoriteMovieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        console.log(this.favoriteMovieData);
      });
  },
  watch: {},
};
</script>
<style>
.userprofile {
  background-image: url(../assets/bg-search.jpg);
  color: rgb(204, 204, 204);
  background-size: cover;
  height: 100vh;
}

.userprofile__content {
  padding: 50px 15px 0;
  display: flex;
  justify-content: space-evenly;
  padding-top: 150px;
}

.userprofile__data {
  flex: 0.3;
}

.userprofile__data h1,
.userprofile__data h3 {
  font-weight: 200;
}

.userprofile__data form {
  margin-top: 50px;
}
.userprofile__data .form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px 0;
}
.userprofile__data .form-group input {
  border-radius: 5px;
  width: 94%;
  height: 35px;
  padding-left: 15px;
  background-color: rgb(228, 228, 228);
  margin-bottom: 20px;
  border: none;
  box-sizing: border-box;
}
.userprofile__data .form-group input:focus {
  background-color: white;
  outline: none;
  border: 1px solid lightgray;
}

.userprofile__favorite {
  flex: 0.4;
}

.userprofile__favorite h2 {
  color: white;
  margin-bottom: 50px;
}

.userprofile__favorite .favoritemovie__wrapper {
  padding: 10px;
  box-sizing: border-box;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.userprofile__favorite .favoritemovie__wrapper::-webkit-scrollbar {
  width: 1px;
}
</style>