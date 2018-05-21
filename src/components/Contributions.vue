<template>
  <div class="index container">

    <!-- PRELOADER -->
    <div class="progress" v-if="isLoading">
      <div class="indeterminate"></div>
    </div>

    <!-- CARDS -->
    <div class="cards-container">

      <!-- FIREBASE -->
      <div class="col s12 m6 l4" v-for="gem in gems" :key="gem.id">
        <div class="card kartu">
          <div class="card-image">
            <img class="gambarKartu" :src="gem.image">
          </div>
          <div class="card-content">
            <i class="material-icons delete" @click="deleteGem(gem.id)">delete</i>
            <h2 class="indigo-text">{{ gem.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ing, index) in gem.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab pink" @click="WAGems(gem)">
              <i class="material-icons edit">share</i
            </router-link>
          </span>
          <span class="btn-floating btn-large halfway-fab orange tombolEdit">
            <router-link :to="{ name: 'EditGem', params: { gem_slug: gem.slug} }">
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
          <div class="card-action author">
            <a :href="gem.url" target="_blank">{{ gem.author }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- LINK TO CONTRIBUTIONS -->
    <div class="cards-container hide-on-med-and-up">
      <div class="col s12 m6 l4">
        <div class="card kontribusi">
          <router-link to="/" class="btn">Go To Featured
            <i class="material-icons right">keyboard_arrow_right</i>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Contributions',
    data () {
      return {
        gems: [],
        seeds: [],
        isLoading: true
      }
    },
    methods: {
      deleteGem (id) {
        // delete doc from firebase
        db.collection('gems').doc(id).delete()
          .then(() => {
            this.gems = this.gems.filter(gem => {
              return gem.id !== id
          })
        })
      },
      WAGems (gem) {
        let title = gem.title;
        let ingredients = gem.ingredients;
        let listGem = '';
        let author = gem.author;
        let url = gem.url;

        ingredients.map(item => {
          listGem += '• ' + item + '\n'
        })

        let urlencodedtext = encodeURIComponent('*' + title + '* \n \n' + listGem + '\n' + '~ ' + author + '\n' + url +'\n \n' + '_Brighten up someone\'s life today!_ \n \n' + '*LifeGems* \n' + 'www.lifegems.id');
        let whatsapp_url = "https://api.whatsapp.com/send?text=" + urlencodedtext;
        window.open(whatsapp_url, '_blank');
      }
    },
    created () {
      // fetch data from the firestore
      db.collection('gems').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.data(), doc.id)
            let gem = doc.data()
            gem.id = doc.id
            this.gems.push(gem)
            this.isLoading = false
        })
      })
    }
  }
</script>

<style>
  body {
    background: #00C9FF;
    background: -webkit-linear-gradient(to right, #92FE9D, #00C9FF);
    background: linear-gradient(to right, #92FE9D, #00C9FF);
  }

  .index {
    margin-top: 60px;
  }

  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
    font-family: 'Kaushan Script', cursive;
    line-height: 1.4em;
  }

  .index .ingredients {
    margin-top: 30px;
    margin-bottom: 7px;
  }

  .index .ingredients li {
    display: inline-block;
  }

  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }

  .kartu {
    margin-bottom: 60px;
    margin-left: 10px;
    margin-right: 10px
  }

  .kontribusi {
    margin-bottom: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .index .bintang {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: orange;
    font-size: 1.4em;
  }

  .tombolEdit {
    margin-right: 70px;
  }

  .author {
    font-size: 10px
  }

  .gambarKartu {
    object-fit: cover;
    width: 100%;
    height: 150px;
  }

  /* MASONRY LAYOUT */
  .cards-container {
    column-break-inside: avoid;
  }
  .cards-container .card {
    display: inline-block;
    overflow: visible;
  }

  @media only screen and (max-width: 600px) {
    .cards-container {
      -webkit-column-count: 1;
      -moz-column-count: 1;
      column-count: 1;
      padding-left: 11px;
      padding-right: 11px
    }
  }
  @media only screen and (min-width: 601px) {
    .cards-container {
      -webkit-column-count: 2;
      -moz-column-count: 2;
      column-count: 2;
    }
  }
  @media only screen and (min-width: 993px) {
    .cards-container {
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;
    }
  }
  .text-center {
    text-align: center;
  }
</style>
