<template>
  <div v-if="gem" class="edit-gem container">
    <h2 class="indigo-text judul">Edit <b>{{ gem.title }}</b></h2>
    <form @submit.prevent="EditGem">
      <div class="field title">
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="gem.title" />
      </div>
      <div class="field">
        <label for="author">Author:</label>
        <input type="text" name="author" v-model="gem.author" />
      </div>
      <div class="field">
        <label for="url">URL:</label>
        <input type="text" name="url" v-model="gem.url" />
      </div>
      <div class="field">
        <label for="image">Image URL:</label>
        <input type="text" name="image" v-model="gem.image" />
      </div>
      <div v-for="(ing, index) in gem.ingredients" :key="index" class="input-field">
        <input type="text" name="ingredient" v-model="gem.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <input type="text" name="add-ingredient" v-model="another" />
      <div class="input-field">
        <i class="material-icons tambah" @click.prevent="addIng">add</i>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Gems</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'EditGem',
    data() {
      return {
        gem: null,
        another: null,
        feedback: null
      }
    },
    methods: {
      EditGem() {
        if (this.gem.title) {
          this.feedback = null
          // create a slug
          this.gem.slug = slugify(this.gem.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection('gems').doc(this.gem.id).update({
            title: this.gem.title,
            ingredients: this.gem.ingredients,
            slug: this.gem.slug,
            author: this.gem.author,
            url: this.gem.url,
            image: this.gem.image
          }).then(() => {
            this.$router.push({
              name: 'Contributions'
            })
          }).catch(err => {
            console.log(err)
          })

          // CLONE FIREBASE
          db.collection('clone').where('slug', '==', this.gem.slug).update({
            title: this.gem.title,
            ingredients: this.gem.ingredients,
            slug: this.gem.slug,
            author: this.gem.author,
            url: this.gem.url,
            image: this.gem.image
          }).then(() => {})
          .catch(err => {
            console.log(err)
          })

          db.collection('clone').doc(this.gem.id).update({
            title: this.gem.title,
            ingredients: this.gem.ingredients,
            slug: this.gem.slug,
            author: this.gem.author,
            url: this.gem.url,
            image: this.gem.image
          }).then(() => {})
          .catch(err => {
            console.log(err)
          })
        }
        else {
          this.feedback = 'You must enter a Gems Title'
        }
      },
      addIng() {
          if (this.another) {
            this.gem.ingredients.push(this.another)
            this.another = null
            this.feedback = null
          } else {
            this.feedback = 'You must enter a value to add a Gem'
          }
        },
        deleteIng(ing) {
          this.gem.ingredients = this.gem.ingredients.filter(ingredient => {
            return ingredient !== ing
          })
        }
      },
      created() {
        let ref = db.collection('gems').where('slug', '==', this.$route.params.gem_slug)
        ref.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.gem = doc.data()
            this.gem.id = doc.id
          })
        })
      }
  }
</script>

<style>
  .edit-gem {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .edit-gem h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .edit-gem .field {
    margin: 20px auto;
  }

  .edit-gem .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #666;
    font-size: 1.4em;
    cursor: pointer;
  }

  .judul {
    font-family: 'Kaushan Script', cursive;
  }

  .tambah {
    position: absolute;
    right: 0;
    bottom: 35px;
    color: #000;
    font-size: 1.4em;
    cursor: pointer;
    border-radius: 20px;
    background-color: yellow;
  }
</style>
