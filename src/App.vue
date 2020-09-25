<template>
  <div id="app">
    <router-view :key="$route.path" :user="user" />
  </div>
</template>

<script>
import firebase from "./utils/firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user = authUser;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
* {
  margin: 0;
}

body {
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
