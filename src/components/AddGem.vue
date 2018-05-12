<template>
  <div class="add-gem container">
    <h2 class="center-align indigo-text judul">Add New Gems</h2>
    <form @submit.prevent="AddGem">
      <div class="field title">
        <label for="title">Gems Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="input-field">
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add a Gem:</label>
        <input type="text" name="add-ingredient" v-model="another"/>
        <div class="input-field">
          <i class="material-icons tambah" @click.prevent="addIng">add</i>
        </div>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Gems</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'AddGem',
    data () {
      return {
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
      AddGem () {
        if (this.title) {
          this.feedback = null
          // create a slug
          this.slug = slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection('gems').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          }).then(() => {
            this.$router.push({ name: 'Index' })
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.feedback = 'You must enter a Gems Title'
        }
      },
      addIng () {
        if (this.another) {
          this.ingredients.push(this.another)
          this.another = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add a Gem'
        }
      },
      deleteIng (ing) {
        this.ingredients = this.ingredients.filter(ingredient => {
          return ingredient !== ing
        })
      }
    }
  }
</script>

<style>
  .add-gem {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .add-gem h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .add-gem .field {
    margin: 20px auto;
  }
  .add-gem .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #666;
    font-size: 1.4em;
    cursor: pointer;
  }
  label {
    color: #fff;
    font-size: 13px;
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
