<template>
  <div class="index container">
    <div class="row">

      <!-- SEEDS -->
      <div class="col s12 m6 l4" v-for="gem in seeds" :key="gem.id">
        <div class="card kartu">
          <div class="card-content">
            <i class="material-icons bintang">star</i>
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
        </div>
      </div>

      <!-- FIREBASE -->
      <div class="col s12 m6 l4" v-for="gem in gems" :key="gem.id">
        <div class="card kartu">
          <div class="card-content">
            <i class="material-icons delete" @click="deleteGem(gem.id)">delete</i>
            <h2 class="indigo-text">{{ gem.title }}</h2>
            <ul class="ingredients">
              <li v-for="(ing, index) in gem.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{ name: 'EditGem', params: { gem_slug: gem.slug} }">
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Index',
    data () {
      return {
        gems: [],
        seeds: [
          {
            title: '10 Things That Require Zero Talent',
            slug: '10-things-that-require-zero-talent',
            ingredients: [
              'Being On Time',
              'Work Ethic',
              'Effort',
              'Body Language',
              'Energy',
              'Attitude',
              'Passion',
              'Being Coachable',
              'Doing Extra',
              'Being Prepared'
            ]
          },
          {
            title: 'Discover Various Personality Type',
            slug: 'discover-various-personality-type',
            ingredients: [
              'Sanguine',
              'Phlegmatic',
              'Choleric',
              'Melancholic'
            ]
          },
          {
            title: 'Understand 5 Love Languages',
            slug: 'understand-5-love-languages',
            ingredients: [
              'Words of Affirmation',
              'Acts of Service',
              'Receiving Gifts',
              'Quality Time',
              'Physical Touch'
            ]
          }
        ]
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

        ingredients.map(item => {
          listGem += '• ' + item + '\n'
        })

        let urlencodedtext = encodeURIComponent('*' + title + '* \n \n' + listGem + '\n \n' + '_Source:_ \n' + '*LifeGems* \n' + 'https://goo.gl/sT2qMT');
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
    /* display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px; */
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
    margin: 30px auto;
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
  }

  .index .bintang {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: orange;
    font-size: 1.4em;
  }
</style>
