<template>
  <nav class="navbar indigo darken-2">
    <div class="nav-wrapper">

      <router-link :to="{ name: 'Index' }">
        <a href="#!" class="brand-logo left"><i class="large material-icons">wb_iridescent</i><span class="logo">LifeGems</span></a>
      </router-link>

      <div class="penyesuaian">
        <ul id="nav-mobile" class="right hide-on-small-only">
          <li :class="isFeaturedActive"><router-link :to="{ name: 'Index' }">Featured</router-link></li>
          <li :class="isContributionsActive"><router-link :to="{ name: 'Contributions' }">Contributions</router-link></li>
        </ul>
      </div>

      <a href="" class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'AddGem' }">
          <i class="material-icons">add</i>
        </router-link>
      </a>

    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        isFeaturedActive: 'active',
        isContributionsActive: null
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/contributions') {
          this.isContributionsActive = 'active'
          this.isFeaturedActive = null
        } else if (to.path === '/') {
          this.isFeaturedActive = 'active'
          this.isContributionsActive = null
        }
      }
    }
  }
</script>

<style>
  nav {
    padding: 0 20px;
  }
  .logo {
    font-family: 'Kaushan Script', cursive;
  }
  .penyesuaian {
    margin-right: 120px
  }
</style>
