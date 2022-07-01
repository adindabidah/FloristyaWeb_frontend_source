<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/">
          <img src="/src/assets/logofloristya.png" alt="Logo"> <Strong class="web has-text-black">Floristya Web</Strong>
        </RouterLink>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <RouterLink class="navbar-item" to="/">
            <span class="icon-text">
              <span class="icon">
                <img src="/src/assets/home.png">
              </span>
              <span class="home has-text-black">Home</span>
            </span>
          </RouterLink>
          <RouterLink class="navbar-item" to="/about">
            <div class="icon-text">
              <span class="icon has-text-info">
                <img src="/src/assets/info.png">
              </span>
              <span class="about has-text-black">About</span>
            </div>
          </RouterLink>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
               <span class="icon-text">
              <span class="icon">
                <img src="/src/assets/data.png">
              </span>
              <span class="api has-text-black">Data Floristya</span>
            </span>

            </a>
            <div class="navbar-dropdown">
              <RouterLink class="navbar-item" to="/customer">
                Customer
              </RouterLink>
              <RouterLink class="navbar-item" to="/cashier">
                Cashier
              </RouterLink>
              <RouterLink class="navbar-item" to="/bunga">
                Bunga
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
export default {
  name: "NavbarView"
}
</script>

<style scoped>
.navbar-item{
  font-size: 15px;
}
.navbar{
  --color-text: #000000;
  background-color: #FEFFD8;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
</style>