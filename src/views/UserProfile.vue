<template>
  <div class="userprofile">
    <Header />
    <div class="userprofile__content">
      <div class="userprofile__data">
        <h1>{{ displayName }}</h1>
        <h3>{{ email }}</h3>
        <Button
          @button-click="isEditing = !isEditing"
          :title="btnEditTitle"
          class="userprofile__btnEdit"
          bcolor="#800000"
          size="normal"
        ></Button>
        <form action="" v-if="isEditing">
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
          <div class="form-group">
            <label for="password">Password</label>
            <div class="userprofile__inputWrapper">
              <input
                id="password"
                :type="typeInputPassword"
                v-model="formUser.password"
              />
              <img
                @click="toggleShowPassword"
                class="eye-icon"
                src="../assets/eye.png"
                alt=""
              />
            </div>
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
        <div
          class="favoritemovie__wrapper"
          v-if="favoriteMovieData.length >= 1"
        >
          <FavoriteMovie
            :key="movie.id"
            :movieId="movie.id"
            v-for="movie in favoriteMovieData"
            :title="movie.data.title"
            :imgUrl="movie.data.imgUrl"
          ></FavoriteMovie>
        </div>
        <div v-else>
          <p>There is no favorite movie</p>
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

import { mapGetters, mapMutations } from "vuex";

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
        password: "",
      },
      favoriteMovieData: [],
      userDataLocalStorage: {},
      isEditing: false,
      typeInputPassword: "password",
    };
  },
  methods: {
    ...mapMutations(["setUpdatedUserData"]),
    reauthenticate(currentPassword) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.userData.email,
        currentPassword
      );
      return user.reauthenticateWithCredential(credential);
    },
    updateUserData() {
      const user = firebase.auth().currentUser;
      if (
        this.formUser.displayName ||
        this.formUser.email ||
        this.formUser.password
      ) {
        if (this.formUser.displayName) {
          user
            .updateProfile({
              displayName: this.formUser.displayName,
            })
            .then(function () {})
            .catch(function (err) {
              this.$swal("", err.message, "warning");
            });
        }
        if (this.formUser.email || this.formUser.password) {
          const currentPassword = prompt(
            "type your current password to change data"
          );

          if (!currentPassword) {
            this.$swal("", "You must type the current password", "warning");
          }

          if (this.formUser.email !== this.email) {
            const newEmail = this.formUser.email;
            this.reauthenticate(currentPassword)
              .then(() => {
                user
                  .updateEmail(newEmail)
                  .then(function () {
                    // Update successful.
                    console.log("success");
                  })
                  .catch(function (error) {
                    // An error happened.
                    console.log("error", error.message);
                  });
              })
              .catch((err) => {
                this.$swal("email", err.message, "warning");
                return;
              });
          } else {
            this.$swal(
              "",
              "Your new email is similar with your old email",
              "warning"
            );
          }
          if (this.formUser.password !== currentPassword) {
            const newPassword = this.formUser.password;
            this.reauthenticate(currentPassword)
              .then(() => {
                user
                  .updatePassword(newPassword)
                  .then(function () {
                    // Update successful.
                    console.log("success");
                  })
                  .catch(function (error) {
                    // An error happened.
                    console.log("error", error.message);
                  });
              })
              .catch((err) => {
                this.$swal("password", err.message, "warning");
                return;
              });
          } else {
            this.$swal(
              "",
              "Your new email is similar with your old email",
              "warning"
            );
          }
        }

        this.$store.commit("setUpdatedUserData", this.formUser);
        this.$swal("", "Data Changed", "success");
        this.formUser.displayName = "";
        this.formUser.email = "";
        this.formUser.password = "";
        this.isEditing = false;
      } else {
        this.$swal("", "Expect some data to change!", "warning");
      }
    },
    toggleShowPassword() {
      if (this.typeInputPassword === "password") {
        this.typeInputPassword = "text";
      } else {
        this.typeInputPassword = "password";
      }
    },
  },
  created() {
    this.userDataLocalStorage = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
    ...mapGetters(["userData"]),
    displayName() {
      return this.userData.displayName || this.userDataLocalStorage.username;
    },
    email() {
      return this.userData.email || this.userDataLocalStorage.email;
    },
    btnEditTitle() {
      return this.isEditing ? "cancel" : "edit profile";
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
  min-height: 100vh;
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
.userprofile__btnEdit {
  margin: 10px 0;
}

.userprofile__data h1,
.userprofile__data h3 {
  font-weight: 200;
  margin-bottom: 5px;
}
.userprofile__data .form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px 0;
}
.userprofile__data .form-group input,
.userprofile__data .form-group .userprofile__inputWrapper {
  border-radius: 5px;
  height: 35px;
  padding-left: 15px;
  background-color: rgb(228, 228, 228);
  margin-bottom: 20px;
  border: none;
  box-sizing: border-box;
}
.userprofile__data .form-group .userprofile__inputWrapper {
  padding-left: 0;
}
.userprofile__data .form-group .userprofile__inputWrapper input {
  width: 100%;
}

.userprofile__data .form-group input:focus,
.userprofile__data .form-group .userprofile__inputWrapper input:focus {
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

.userprofile__inputWrapper {
  position: relative;
}

.userprofile__inputWrapper .eye-icon {
  position: absolute;
  right: 10px;
  top: 25%;
  opacity: 0.4;
  cursor: pointer;
}

@media (max-width: 768px) {
  .userprofile__content {
    flex-direction: column;
  }

  .userprofile__favorite {
    margin-top: 50px;
  }
  .userprofile__favorite h2 {
    margin-bottom: 0;
  }
  .userprofile__data .form-group input,
  .userprofile__data .form-group .userprofile__inputWrapper input {
    width: 80%;
  }
}
</style>