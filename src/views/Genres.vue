<template>
  <div class="genres">
    <Header />
    <div
      class="genres__header"
      :style="{
        background:
          'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(https://image.tmdb.org/t/p/original/' +
          this.showingBanner +
          ')',
      }"
    >
      <h1>{{ titleDisplay }}</h1>
      <p><span>Watchinema</span> Choice’s</p>
      <div class="genres__fadeBottom"></div>
    </div>
    <div class="genres__content">
      <FilmCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :fetchUrl="fetchUrl"
      ></FilmCard>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import FilmCard from "../components/FilmCard";
import axios from "../data/axios";
import Footer from "../components/Footer";

export default {
  name: "Genres",
  props: ["link", "genres"],
  components: {
    Header,
    FilmCard,
    Footer,
  },
  data() {
    return {
      fetchUrl: "",
      API_KEY: "f15d819549589d708cf177ff07116a0a",
      movies: [],
      showingBanner: {},
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
  },
  computed: {
    titleDisplay() {
      return this.$route.params.genres;
    },
  },
  async mounted() {
    this.fetchUrl = this.$route.query.link;
    // this.fetchUrl =
    //   this.$route.params.genres === "Trending Now"
    //     ? `/trending/all/week?api_key=${this.API_KEY}&language=en-US`
    //     : null || this.$route.params.genres === "Top Rated"
    //     ? `/movie/top_rated?api_key=${this.API_KEY}&language=en-US`
    //     : null || this.$route.params.genres === "Action Movies"
    //     ? `/discover/movie?api_key=${this.API_KEY}&with_genres=28`
    //     : null || this.$route.params.genres === "Comedy Movies"
    //     ? `/discover/movie?api_key=${this.API_KEY}&with_genres=35`
    //     : null || this.$route.params.genres === "Horror Movies"
    //     ? `/discover/movie?api_key=${this.API_KEY}&with_genres=27`
    //     : null || this.$route.params.genres === "Romance Movies"
    //     ? `/discover/movie?api_key=${this.API_KEY}&with_genres=10749`
    //     : null || this.$route.params.genres === "Documentaries Movies"
    //     ? `/discover/movie?api_key=${this.API_KEY}&with_genres=99`
    //     : null;
    this.setMovies(await this.fetchData(this.fetchUrl));
    this.showingBanner = await this.movies[
      Math.floor(Math.random() * this.movies.length - 1)
    ].backdrop_path;
  },
};
</script>

<style scoped>
.genres__header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 7rem;
  height: 300px;
  color: rgb(238, 238, 238);
  background-color: #acacac;
  background-size: cover !important;
  position: relative;
}

.genres__fadeBottom {
  position: absolute;
  content: "";
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
  bottom: 0;
  left: 0;
  right: 0;
  height: 170px;
  z-index: 0;
}

.genres__header h1 {
  z-index: 1;
  font-size: 40px;
}

.genres__header p {
  z-index: 1;
}
.genres__header span {
  color: #800000;
}

.genres__content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px 0;
}
</style>