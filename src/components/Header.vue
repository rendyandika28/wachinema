<template>
  <div class="header" :class="{ header__black: headerBlack }">
    <router-link to="/">
      <img class="header__image" src="../assets/logo.png" alt />
    </router-link>
    <div class="header__items" :class="{ slide: toggle }">
      <input
        type="text"
        class="header__search"
        placeholder="Search film here..."
        :class="{ transparentSearch: !headerBlack }"
        v-model="searchQuery"
        @keyup.enter="searchMovie"
      />
      <div class="dropdown">
        <p class="header__greeting">
          Halo&nbsp;
          <span>
            <strong>{{ userData.displayName }}</strong>
          </span>
        </p>
        <div class="dropDownContent">
          <router-link
            :to="{
              name: 'UserProfile',
              params: { userid: userData.displayName },
            }"
            ><a>My Profile</a>
          </router-link>
        </div>
      </div>
      <Button
        @button-click="handleSignOut"
        title="sign out"
        bcolor="#800000"
        size="normal"
      />
    </div>

    <div
      class="menu-toggle"
      :class="{ whiteMenu: toggle }"
      @click="toggle = !toggle"
    >
      <span></span>
      <span></span>
      <span></span>
      <input type="checkbox" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import firebase from "../utils/firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  components: {
    Button,
  },
  data() {
    return {
      toggle: false,
      headerBlack: false,
      searchQuery: "",
    };
  },
  methods: {
    searchMovie() {
      this.$router.push({
        name: "Search",
        params: { name: this.searchQuery },
      });
    },
    handleSignOut() {
      firebase.auth().signOut();
      this.$router.push({
        name: "Login",
      });
    },
    ...mapActions(["getUserData"]),
  },
  created() {
    this.getUserData();
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.headerBlack = true;
      } else this.headerBlack = false;
    });
  },
  computed: mapGetters(["userData"]),
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropDownContent {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  /* text-decoration: none; */
}
.dropDownContent a {
  color: black;
  padding: 8px 5px;
  text-decoration: none !important;
  display: block;
}

.dropDownContent a:hover {
  background-color: #f1f1f1;
}
.dropdown:hover .dropDownContent {
  display: block;
  transition: all ease-in 0.3s;
}
.white {
  color: white;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  position: fixed;
  top: 0;
  z-index: 99;
  left: 0;
  right: 0;

  transition-timing-function: ease-in;
  transition: all 0.5s;
}

.header__black {
  background-color: #111;
}

.header__items {
  align-items: center;
  flex: 0.9;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.header__image {
  object-fit: contain;
  width: 140px;
}

.header__search {
  flex: 0.8;
  border-radius: 5px;
  border: 1px solid lightgray;
  height: 32px;
  padding-left: 20px;
  box-sizing: border-box;
  transition: all 0.5s;
  color: black;
}
.transparentSearch {
  background-color: unset;
  border: unset;
  border: 0.2px solid lightgray;
  transition: all 0.5s;
  color: white;
}

.transparentSearch::placeholder {
  color: white;
}

.header__search:focus {
  border: 0.5px solid #800000;
  outline: none;
}

.header__greeting {
  display: flex;
  flex-direction: column;
  font-weight: 200;
  font-size: 13px;
  color: white;
  border: none;
  cursor: pointer;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  height: 18px;
  justify-content: space-between;
  position: relative;
  border: 0.5px solid gray;
  padding: 10px;
  border-radius: 10px;
}
.menu-toggle input {
  position: absolute;
  width: 40px;
  height: 28px;
  left: -6px;
  top: -5px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.menu-toggle span {
  display: block;
  width: 28px;
  height: 3px;
  background-color: black;
  border-radius: 3px;
  transition: all ease-in 0.3s;
}

.whiteMenu span {
  display: block;
  width: 28px;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: all ease-in 0.3s;
}

@media (max-width: 576px) {
  .menu-toggle {
    display: flex;
  }

  .header {
    justify-content: space-between;
    padding: 10px 15px;
  }

  .header__items {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 50%;
    flex-direction: column;
    justify-content: start;
    border: 1px solid black;
    align-items: stretch;
    background-color: black;
    color: white;
    padding: 10px;
    padding-top: 70px;
    z-index: -10;
    transform: translateX(100%);
    transition: all ease-in-out 0.7s;
    opacity: 0;
  }

  .header__items.slide {
    opacity: 1;
    transform: translateX(0);
  }

  .header__greeting {
    margin: 30px 0;
    flex-direction: row;
  }

  .header__greeting span {
    margin-left: 5px;
  }

  .header__search {
    flex: none;
  }
}
</style>