<template>
  <div class="login">
    <header>
      <img src="../assets/logo.png" alt="" />
    </header>
    <div class="login__">
      <div class="login__content">
        <h1>
          Search your favorite movies, with easy way <br />
          in your gadget
        </h1>
        <div class="footer">
          <ul>
            <li>About Us</li>
            <li>|</li>
            <li>Social Media</li>
            <li>|</li>
            <li>Terms of Use</li>
          </ul>
          <img src="../assets/logo-footer.png" alt="" />
        </div>
      </div>
      <div class="login__form">
        <form action="">
          <input
            type="email"
            placeholder="Email"
            aria-describedby="email"
            v-model="formLogin.email"
          />
          <input
            type="password"
            placeholder="Password"
            aria-describedby="password"
            v-model="formLogin.password"
          />
          <Button
            @button-click="submitLogin"
            title="login"
            bcolor="#333"
            size
            class="btnLarge"
          ></Button>
        </form>
        <hr />
        <div class="login__register">
          <small>Don't have an account yet?</small>
          <Button
            @button-click="clickModal"
            title="register"
            bcolor="#333"
            size="normal"
          ></Button>
        </div>
      </div>
    </div>

    <div v-show="showModal" id="modalRegister" class="modal">
      <div class="modal-content">
        <span @click.prevent="clickModal" class="close">&times;</span>
        <img src="../assets/logo.png" alt="" />
        <form action="">
          <input
            @keydown.space.prevent
            type="text"
            placeholder="Username"
            v-model="formRegister.username"
          />
          <input
            type="email"
            placeholder="Email"
            v-model="formRegister.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="formRegister.password"
          />
          <Button
            @button-click="submitRegister"
            style="margin: auto"
            title="register"
            bcolor="#333"
            size
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import { mapMutations, mapGetters } from "vuex";

import firebase from "../utils/firebase";

export default {
  name: "Login",
  components: {
    Button,
  },
  data() {
    return {
      showModal: false,
      formRegister: {
        username: "",
        email: "",
        password: "",
      },
      formLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    clickModal() {
      this.showModal = !this.showModal;
    },
    ...mapMutations(["setNewUserDisplayName"]),

    submitRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formRegister.email,
          this.formRegister.password
        )
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: this.formRegister.username,
          });
          this.$store.commit(
            "setNewUserDisplayName",
            this.formRegister.username
          );

          this.$swal("Selamat", "akun anda berhasil didaftarkan", "success");
          this.showModal = false;
          this.$router.push({
            name: "Home",
          });
        })
        .catch(() =>
          this.$swal(
            "Maaf",
            "Email/password yang anda masukkan telah digunakan",
            "warning"
          )
        );
    },
    submitLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.formLogin.email,
          this.formLogin.password
        )
        .then(() => {
          this.$swal("Success", "Enjoy your film!", "success");
          // this.$router.go({ path: this.$router.path });

          this.$router.push({
            name: "Home",
          });
        })
        .catch((err) => this.$swal("Sorry", err.message, "warning"));
    },
  },
  computed: { ...mapGetters(["userData", "newUserDisplayName"]) },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.671); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 10% auto; /* 15% from the top and centered */
  padding: 50px 20px;
  box-sizing: border-box;
  border: 1px solid #888;
  width: 30%; /* Could be more or less, depending on screen size */
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.modal-content form input {
  border-radius: 10px;
  height: 35px;
  border: none;
  padding-left: 15px;
  background-color: rgba(182, 182, 182, 0.5);
  margin-bottom: 20px;
  transition: all ease-in 0.1s;
  box-sizing: border-box;
}
.modal-content form input:focus {
  background-color: white;
  outline: none;
  border: 1px solid lightgray;
}

.modal-content form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 0;
  right: 10px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.login {
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.596);
  background-image: url(../assets/bg-search.jpg);
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
}
header {
  padding: 15px;
  text-align: center;
}

header img {
  object-fit: contain;
  width: 140px;
}

ul {
  padding: 0;
  display: flex;
}

ul li {
  color: rgba(255, 255, 255, 0.801);
  list-style: none;
  margin-right: 10px;
}

.login__ {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login__content h1 {
  margin-bottom: 100px;
}

.login__form {
  width: 400px;
  height: 400px;
  background-color: #ffffff6c;
  border-radius: 10px;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login__form form {
  box-sizing: border-box;
  width: 100%;
}
.login__form input {
  border-radius: 10px;
  width: 94%;
  height: 35px;
  border: none;
  padding-left: 15px;
  background-color: rgb(228, 228, 228);
  margin-bottom: 20px;
}
.login__form input:focus {
  background-color: white;
  outline: none;
  border: none;
}
hr {
  margin: 20px 0;
}

.login__register {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btnLarge {
  margin: auto !important;
  width: 100% !important;
}
@media (max-width: 768px) {
  .login__form {
    height: 300px;
    margin-bottom: 20px;
    background-color: #acacac;
  }
}
@media (max-width: 567px) {
  .modal-content {
    width: 90%; /* Could be more or less, depending on screen size */
  }
  .login__ {
    flex-direction: column;
  }
  .login__form {
    width: 90vw;
    height: 300px;
    margin-bottom: 20px;
    background-color: #acacac;
    order: 1;
  }

  .login__content {
    width: 90vw;
    text-align: center;
    order: 2;
  }
  ul {
    justify-content: center;
  }
  .login__content h1 {
    font-size: 26px;
    font-weight: 200;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>