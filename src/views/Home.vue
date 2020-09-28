<template>
  <div class="home">
    <Header />
    <Banner />
    <RowFilm
      titleRow="Trending Now"
      :fetchUrl="fetchTrending"
      :isRowPosters="true"
    ></RowFilm>
    <RowFilm
      titleRow="Top Rated"
      :fetchUrl="fetchTopRated"
      :isRowTopRated="true"
    ></RowFilm>
    <div class="home__expandBtn">
      <h3 class="accordion" @click="expandMenu">
        See Movies By Genres
        <span>
          <img src="../assets/down-arrow.png" alt="icon" width="13" />
        </span>
      </h3>
    </div>
    <div class="panel">
      <RowFilm titleRow="Action Movies" :fetchUrl="fetchActionMovies"></RowFilm>
      <RowFilm titleRow="Comedy Movies" :fetchUrl="fetchComedyMovies"></RowFilm>
      <RowFilm titleRow="Horror Movies" :fetchUrl="fetchHorrorMovies"></RowFilm>
      <RowFilm
        titleRow="Romance Movies"
        :fetchUrl="fetchRomanceMovies"
      ></RowFilm>
      <RowFilm
        titleRow="Documentaries Movies"
        :fetchUrl="fetchDocumentaries"
      ></RowFilm>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import Banner from "../components/Banner";
import RowFilm from "../components/RowFilm";
import Footer from "../components/Footer";
import requests from "../data/request.js";

export default {
  name: "Home",
  components: { Header, Banner, RowFilm, Footer },
  data() {
    return {
      ...requests,
    };
  },
  methods: {
    expandMenu(e) {
      e.target.classList.toggle("active");
      const panel = document.querySelector(".panel");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    },
  },
};
</script>

<style scoped>
.home__expandBtn {
  height: 60px;
  background-color: #000;
  text-align: center;
  line-height: 60px;
  color: whitesmoke;
}

.home__expandBtn span {
  margin-left: 5px;
}

.accordion {
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.5s;
}
.accordion:hover,
.active {
  background-color: rgb(34, 34, 34);
}
.panel {
  padding: 0 10px;
  background-color: white;
  max-height: 0;
  transition: max-height 0.5s;
  overflow: hidden;
}
</style>
