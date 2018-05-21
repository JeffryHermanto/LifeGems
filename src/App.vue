<template>
  <div id="app">
    <body class="Site">
      <header>
        <Navbar />
      </header>
      <main class="Site-content">
        <router-view />
      </main>
      <Footer />
    </body>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Footer from '@/components/Footer'

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data () {
      return {

      }
    }
  }
</script>

<style>
  .Site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .Site-content {
    flex: 1;
  }
</style>
