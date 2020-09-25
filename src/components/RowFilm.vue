<template>
  <div class="rowfilm" v-scroll-reveal.reset v-if="movies.length >= 1">
    <div class="rowfilm__titleWrapper">
      <h2 class="rowfilm__title">{{ titleRow }}</h2>
      <router-link
        :to="{
          name: 'Genres',
          params: { genres: titleRow },
          query: { link: fetchUrl },
        }"
        >See All</router-link
      >
    </div>
    <div class="rowfilm__posters">
      <router-link
        :key="movie.id"
        v-for="movie in movies.slice(0, 8)"
        :to="{
          name: 'Details',
          params: { id: movie.id },
          query: { link: fetchUrl },
        }"
      >
        <img
          v-if="movie.poster_path"
          class="rowfilm__poster"
          :class="classRowFilm"
          :src="imageBackgroundFilm(movie)"
        />
      </router-link>
    </div>
  </div>
  <div class="rowfilm__notfound" v-else>
    <h2>Your search did not match any Movies 😢</h2>
  </div>
</template>

<script>
import axios from "../data/axios.js";

export default {
  name: "RowFilm",
  props: ["titleRow", "fetchUrl", "isRowPosters", "isRowTopRated"],
  data() {
    return {
      movies: [],
      baseUrl: "https://image.tmdb.org/t/p/original/",
      classRowFilm: null,
    };
  },
  methods: {
    setMovies(data) {
      this.movies = data;
    },
    fetchData: async (fetchUrl) => {
      const request = await axios.get(fetchUrl);
      return request.data.results;
    },
    imageBackgroundFilm(movie) {
      return this.isRowPosters
        ? this.baseUrl + movie.poster_path
        : this.baseUrl + movie.backdrop_path;
    },
  },
  async mounted() {
    this.setMovies(await this.fetchData(this.fetchUrl));

    this.classRowFilm = {
      rowfilm__posterNormal: this.isRowPosters,
      rowfilm__posterLarge: this.isRowTopRated,
    };
  },
};
</script>

<style scoped>
.rowfilm {
  margin-top: 20px;
}

.rowfilm__titleWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rowfilm__titleWrapper a {
  margin-right: 10px;
  text-decoration: none;
}

.rowfilm__title {
  color: #800000;
  padding-left: 20px;
  font-size: 30px;
  text-transform: capitalize;
}
.rowfilm__posters {
  display: flex;
  overflow-x: auto;
  padding: 20px;
}

.rowfilm__posters::-webkit-scrollbar {
  display: none;
}

.rowfilm__poster {
  object-fit: contain;
  /* width: 100%; */
  max-height: 100px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.rowfilm__poster:hover {
  transform: scale(1.08);
}

.rowfilm__posterNormal {
  max-height: 250px;
}

.rowfilm__posterNormal:hover {
  transform: scale(1.09);
}

.rowfilm__posterLarge {
  max-height: 195px;
}

.rowfilm__notfound {
  background-color: #8000007a;
  width: 70%;
  min-height: 70px;
  margin: 100px auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.rowfilm__notfound h2 {
  font-weight: 200;
}
</style>