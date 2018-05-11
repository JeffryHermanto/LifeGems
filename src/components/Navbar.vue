<template>
  <nav class="navbar indigo darken-2">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Index' }">
        <a href="#!" class="brand-logo left"><i class="large material-icons">wb_iridescent</i><span class="logo">LifeGems</span></a>
      </router-link>
      <a href="" class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'AddGem' }">
          <i class="material-icons">add</i>
        </router-link>
      </a>
    </div>
  </nav>
  <!-- <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title logo">LifeGems</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddGem' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div> -->
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {

      }
    }
  }
</script>

<style>
  .navbar {
    height: 75px;
    padding-top: 7.5px;
  }
  nav {
    padding: 0 20px;
  }
  .logo {
    font-family: 'Kaushan Script', cursive;
  }
</style>
