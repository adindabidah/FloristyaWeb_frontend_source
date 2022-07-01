<script>
import FooterView from "./views/FooterView.vue";
import NavbarView from "./views/NavbarView.vue";
export default {
  components: {FooterView, NavbarView}
}
</script>

<template>
  <NavbarView/>
  <main>
    <div class="container">
      <RouterView/>
    </div>
  </main>
  <FooterView/>
</template>

<style>
main{
  background-image: url("/src/assets/bgfloristya.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}
.isi{
  background: rgb(212, 213, 172);
  border-radius: 30px;
}
.hero{
  padding: 30px;
}
.table{
  border-radius: 30px;
}
.card{
  box-shadow: 5px 10px grey;
}
</style>