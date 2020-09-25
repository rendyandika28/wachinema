<template>
  <div class="favoritemovie">
    <img
      src="https://image.tmdb.org/t/p/original//8g1rUabKleLvovt0Sx6bXgWfC42.jpg"
      alt=""
      width="110"
    />
    <h3>Avengers Sevenfold</h3>
    <span>X</span>
  </div>
</template>

<script>
export default {};
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