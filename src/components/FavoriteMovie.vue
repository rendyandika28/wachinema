<template>
  <div class="favoritemovie">
    <img :src="imgUrlFilm" alt="" width="110" />
    <h3>{{ title }}</h3>
    <span @click="deleteFilm">X</span>
  </div>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "FavoriteMovie",
  props: ["title", "imgUrl", "movieId"],
  methods: {
    deleteFilm() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("favorites")
        .doc(this.movieId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
  },
  computed: {
    imgUrlFilm() {
      return this.imgUrl === "https://image.tmdb.org/t/p/original/null"
        ? "https://www.flaticon.com/svg/static/icons/svg/633/633600.svg"
        : this.imgUrl;
    },
  },
};
</script>

<style>
.favoritemovie {
  color: white;
  display: flex;
  align-items: center;
  background-color: #530000;
  border-radius: 10px;
  position: relative;
  margin: 10px 0;
}

.favoritemovie img {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  object-fit: contain;
  height: 70px;
}

.favoritemovie h3 {
  flex: 1;
  padding-left: 10px;
  font-weight: 200;
}

.favoritemovie span {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  padding: 5px;
  border-radius: 100%;
  cursor: pointer;
}
</style>