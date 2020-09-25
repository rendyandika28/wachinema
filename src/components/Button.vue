<template>
  <button @click.prevent="$emit('button-click')" :style="styling">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["title", "bcolor", "size"],
  data() {
    return {
      styling: {
        backgroundColor: this.bcolor,
        padding: `11px ${this.size === "normal" ? "24px" : "50px"}`,
      },
    };
  },
};
</script>

<style>
button {
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  outline: none;
  border: none;
  font-weight: 200;
  border-radius: 0.4vw;
  padding: 0.5rem 2rem;
  margin-right: 1rem;
  transition: all 0.3s;
}

button:hover {
  opacity: 0.8;
}

button:focus {
  outline: none;
}
</style>