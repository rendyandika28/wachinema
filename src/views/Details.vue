<template>
  <div class="details">
    <div
      v-if="movie.backdrop_path"
      class="details__film"
      :style="{
        background:
          'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), ' +
          backgroundDetail +
          ' ',
      }"
    >
      <Header />
      <div class="details__content">
        <img :src="imagePoster" alt class="details__image" />
        <div class="details__info">
          <h2>{{ title }}</h2>
          <h3 v-if="movie.vote_average">
            Rating:
            <span>{{ movie.vote_average }}</span> /10
          </h3>
          <p v-if="movie.overview">{{ movie.overview }}</p>
          <h4 v-if="movie.release_date">
            Release Date:
            <span>{{ movie.release_date }}</span>
          </h4>
          <h4 v-if="movie.genres">
            Genres:
            <!-- <span :key="genre.id" v-for="genre in movie.genres">{{genre.name}}&nbsp;</span> -->
            <span>{{ movieGenres.join(", ") }}</span>
          </h4>
          <div class="details__action">
            <Button
              v-if="showFilm"
              @button-click="playVideo"
              title="Watch Trailers"
              bcolor="#333"
              size
            ></Button>
            <Button
              v-if="showClickFavorite"
              @button-click="handleClickFavorite"
              title="add to favorite"
              bcolor="#333"
              size="normal"
            ></Button>
          </div>
        </div>
      </div>
    </div>
    <youtube
      class="frameVideo"
      v-if="trailerUrl"
      :video-id="trailerUrl"
      ref="youtube"
      width="100%"
      height="460"
    />
    <RowFilm
      titleRow="Similars Movies"
      :fetchUrl="movieCategoryLink"
      :isRowPosters="true"
    />
  </div>
</template>

<script>
import Header from "../components/Header";
import Button from "../components/Button";
import RowFilm from "../components/RowFilm";
import axios from "../data/axios";
import movieTrailer from "movie-trailer";
import firebase from "../utils/firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Details",
  components: {
    Header,
    Button,
    RowFilm,
  },
  data() {
    return {
      movie: {},
      movieID: "",
      movieCategoryLink: this.$route.query.link,
      movieGenres: [],
      baseUrl: "https://image.tmdb.org/t/p/original/",
      trailerUrl: "",
      movieFirebase: [],
      showClickFavorite: true,
    };
  },
  methods: {
    setMovies(data) {
      this.movie = data;
    },
    fetchData: async (movieID) => {
      const request = await axios.get(
        "/movie/" + movieID + "?api_key=f15d819549589d708cf177ff07116a0a"
      );
      return request.data;
    },
    setGenresMovie() {
      this.movie.genres.map((genre) => this.movieGenres.push(genre.name));
    },
    async setMoviesData(to = null) {
      this.movieID = to ? to.params.id : this.$route.params.id;
      this.setMovies(await this.fetchData(this.movieID));
      this.setGenresMovie();
    },
    playVideo() {
      if (!this.trailerUrl) {
        movieTrailer(this.movie?.title || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            this.trailerUrl = urlParams.get("v");
          })
          .catch(() => this.$swal("Maaf", "Video tidak ditemukan", "warning"));
      }
    },
    handleClickFavorite() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("favorites")
        .add({
          title:
            this.movie.title || this.movie.name || this.movie.original_name,
          imgUrl: `${this.baseUrl}${this.movie.backdrop_path}`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      this.$toast.success("Success add Favorite", {
        // optional options Object
        type: "success",
        duration: 3000,
        position: "top",
      });

      this.showClickFavorite = false;
    },
    ...mapActions(["getUserDataFavorite"]),
  },
  async mounted() {
    await this.setMoviesData();
    window.scrollTo(0, 0);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("favorites")
      .orderBy("timestamp", "desc")

      .onSnapshot((querySnapshot) => {
        this.movieFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
      });
  },
  computed: {
    title() {
      return this.movie.title || this.movie.name || this.movie.original_name;
    },
    imagePoster() {
      return `${this.baseUrl}${this.movie.poster_path}`;
    },
    showFilm() {
      return this.trailerUrl ? false : true;
    },
    backgroundDetail() {
      return (
        "url(https://image.tmdb.org/t/p/original/" +
          this.movie.backdrop_path +
          ")" || null
      );
    },
    ...mapGetters(["userDataFavorite"]),
  },

  created() {
    this.getUserDataFavorite();
  },
  watch: {
    async $route(to) {
      await this.setMoviesData(to);
    },
  },
};
</script>

<style scoped>
.details__film {
  display: flex;
  align-items: center;
  min-height: 600px;
  background-color: black;
  background-size: cover !important;
  /* margin-bottom: 40px; */
}

.frameVideo {
  transition: all ease-in 0.4s;
  margin-bottom: 40px;
}

.details__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: auto;
  flex-wrap: wrap;
}

.details__info {
  /* margin-left: 30px; */
  color: white;
  flex: 0.9;
}

.details__info span {
  color: rgb(238, 238, 238);
  font-weight: 200;
}

.details__info h2 {
  font-size: 40px;
}
.details__info p {
  margin: 40px 0;
}
.details__image {
  object-fit: contain;
  height: 400px;
  border-radius: 10px;
  /* flex: 0; */
}

.details__action {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .details__content {
    margin-top: 70px;
    width: 90%;
    justify-content: center;
  }
}
</style>