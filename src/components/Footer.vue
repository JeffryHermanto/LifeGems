<template>
  <footer class="page-footer indigo darken-2 kaki">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Random Quotes</h5>
          <blockquote class="grey-text text-lighten-4">{{ quote }}</blockquote>
          <p class="grey-text text-lighten-4" v-if="author">~ {{ author }}</p>
        </div>

        <div class="col l4 offset-l2 s12">
          <h5 class="white-text techStacks">What is LifeGems?</h5>
          <p>
            A collection of inspirations, motivations, summaries, &amp; tips for you to keep moving forward in life no matter what.
            You can contribute &amp; share your life gems too!
          </p>
          <p>
            <em>Brighten up someone's life today!</em>
          </p>
          <!-- <h5 class="white-text techStacks">TechStacks</h5>
          <div class="col s6 techStacksItem">
            <ul>
              <li><a class="grey-text text-lighten-3" href="https://atom.io/" target="_blank">Atom</a></li>
              <li><a class="grey-text text-lighten-3" href="https://nodejs.org/en/" target="_blank">Node.js</a></li>
              <li><a class="grey-text text-lighten-3" href="https://www.npmjs.com/" target="_blank">npm</a></li>
              <li><a class="grey-text text-lighten-3" href="https://www.npmjs.com/package/axios" target="_blank">Axios</a></li>
              <li><a class="grey-text text-lighten-3" href="https://www.npmjs.com/package/slugify" target="_blank">Slugify</a></li>
              <li><a class="grey-text text-lighten-3" href="https://github.com/" target="_blank">GitHub</a></li>
            </ul>
          </div>
          <div class="col s6 techStacksItem">
            <ul>
              <li><a class="grey-text text-lighten-3" href="https://vuejs.org" target="_blank">Vue.js</a></li>
              <li><a class="grey-text text-lighten-3" href="https://materializecss.com/" target="_blank">Materialize</a></li>
              <li><a class="grey-text text-lighten-3" href="https://firebase.google.com" target="_blank">Firebase</a></li>
              <li><a class="grey-text text-lighten-3" href="https://fonts.google.com/" target="_blank">Google Fonts</a></li>
              <li><a class="grey-text text-lighten-3" href="https://market.mashape.com/" target="_blank">Mashape API</a></li>
              <li><a class="grey-text text-lighten-3" href="https://faq.whatsapp.com/en" target="_blank">WhatsApp API</a></li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <a class="whatsApp" @click="whatsApp">© 2018 Jeffry Hermanto</a>
        <a class="grey-text text-lighten-4 right" href="http://www.jhproject.id" target="_blank">jhproject.id</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Footer',
    data () {
      return {
        quote: null,
        author: null
      }
    },
    created () {
      // Untuk men-decode HTML entities
      function decodeEntities(encodedString) {
        var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
        var translate = {
          "nbsp": " ",
          "amp" : "&",
          "quot": "\"",
          "lt"  : "<",
          "gt"  : ">"
        };
        return encodedString.replace(translate_re, function(match, entity) {
          return translate[entity];
        }).replace(/&#(\d+);/gi, function(match, numStr) {
          var num = parseInt(numStr, 10);
          return String.fromCharCode(num);
        });
      }

      // Konfigurasi Mashape API
      let url = 'https://sumitgohil-random-quotes-v1.p.mashape.com/fetch/randomQuote'
      var config = {
        headers: {
          'X-Mashape-Key': 'MYCUJYqhjpmshQ28wOfmQT6fZc2jp1BWcOKjsnxbTW2NTQHCWe',
          'Accept': 'application/json'
        }
      };

      // Axios
      axios.get(url, config)
      .then(ambilData => {
        console.log(ambilData.data);
        this.quote = decodeEntities(ambilData.data[0].quote);
        this.author = decodeEntities(ambilData.data[0].author_name);
      })
      .catch(error => {
        console.log(error);
      });
    },
    methods: {
      whatsApp () {
        // Message WA
        var urlencodedtext = encodeURIComponent("Hello Jeffry, I want to discuss about...");
        // Kirim WA
        var whatsappphonenumber = 6282177771078; // Jeffry Hermanto
        var whatsapp_url = "https://api.whatsapp.com/send?phone=" + whatsappphonenumber + "&text=" + urlencodedtext;
        window.open(whatsapp_url, '_blank');
      }
    }
  }
</script>

<style>
  .whatsApp {
    color: #f2f2f2;
    cursor: pointer;
  }

  .whatsApp:hover {
    color: yellow
  }

  .techStacks {
    margin-bottom: 0.5px
  }

  .techStacksItem li {
    margin-left: -10px;
  }

  .kaki {
    margin-top: 15px
  }
</style>
