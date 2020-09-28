<template>
  <div class="search">
    <Header />
    <div class="search__header">
      <h1>
        Result for <span>{{ $route.params.name }}</span>
      </h1>
    </div>
    <div class="search__content">
      <RowFilm
        :titleRow="$route.params.name"
        :fetchUrl="fetchUrl"
        isRowPosters="true"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import RowFilm from "../components/RowFilm";
export default {
  name: "Search",
  components: {
    Header,
    RowFilm,
  },
  data() {
    return {
      fetchUrl: `/search/movie?api_key=f15d819549589d708cf177ff07116a0a&language=en-US&query=${this.$route.params.name}&page=1&include_adult=false`,
      API_KEY: "f15d819549589d708cf177ff07116a0a",
      movies: [],
    };
  },
};
</script>

<style>
.search__header {
  display: flex;
  align-items: center;
  padding-left: 7rem;
  height: 300px;
  color: rgb(238, 238, 238);
  background-size: cover !important;
  background-image: url(../assets/bg-search.jpg);
  background-position: center;
}

.search__header h1 {
  cursor: context-menu;
}

.search__header h1 span {
  font-size: 40px;
  text-transform: capitalize;
  color: #800000;
  transition: all ease-in 0.2s;
}

.search__header h1 span:hover {
  color: #9c0000;
}

@media (max-width: 768px) {
  .search__header {
    justify-content: center;
    padding-left: 0;
  }
}
</style>