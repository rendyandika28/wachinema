<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
}

body {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
