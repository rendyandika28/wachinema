<template>
  <div
    class="filmcard"
    :style="{
      background:
        'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(https://image.tmdb.org/t/p/original/' +
        movie.backdrop_path +
        ')',
    }"
    @click="directToDetail"
  >
    <div class="filmcard__content">
      <div class="filmcard__info">
        <h4>{{ movie.title || movie.name || movie.original_name }}</h4>
        <h6>{{ truncate(movie.overview, 100) }}</h6>
      </div>
      <div class="filmcard__rating">
        <strong>
          <span>{{ movie.vote_average }}</span
          >/10
        </strong>
      </div>
    </div>
    <div class="filmcard__fadeBottom"></div>
  </div>
</template>

<script>
import { truncate } from "../utils/utils";
export default {
  name: "FilmCard",
  props: ["movie", "fetchUrl"],
  data() {
    return {
      truncate,
      backgroundFilmCard: null,
    };
  },
  methods: {
    directToDetail() {
      this.$router.push({
        name: "Details",
        params: { id: this.movie.id },
        query: { link: this.fetchUrl },
      });
    },
  },
};
</script>

<style>
.filmcard {
  margin: 5px;
  display: flex;
  align-items: flex-end;
  background-color: grey;
  width: 400px;
  height: 230px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: cover !important;
}

.filmcard__content {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
}

.filmcard__fadeBottom {
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
  height: 80px;
  border-radius: 10px;
}

.filmcard__info {
  flex: 0.9;
}

.filmcard__info h4 {
  font-size: 1.5rem;
  font-weight: 300;
  color: rgb(233, 233, 233);
}

.filmcard__info h6 {
  font-size: 0.8rem;
  font-weight: 100;
  color: rgb(218, 218, 218);
}

.filmcard__rating {
  margin-left: auto;
  font-size: 18px;
}
</style>