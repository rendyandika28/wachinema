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
  box-sizing: border-box;
  overflow-x: hidden;
  /* font-family: ; */
}
</style>
