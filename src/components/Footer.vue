<template>
  <footer>
    <img src="../assets/logo-footer.png" alt="footer-logo" />
    <ul>
      <li>About Us</li>
      <li>|</li>
      <li>Social Media</li>
      <li>|</li>
      <li>Terms of Use</li>
    </ul>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
  background-color: #000;
}

img {
  object-fit: contain;
}

ul {
  display: flex;
}

ul li {
  color: rgba(255, 255, 255, 0.801);
  list-style: none;
  margin-right: 10px;
}

@media (max-width: 567px) {
  footer {
    padding: unset;
    padding-top: 20px;
    flex-direction: column;
    justify-content: unset;
  }
}
</style>