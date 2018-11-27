<template>
  <div class="row" id="toolBar">
    <div class="col-sm-1" id="ico">
      <img src="../assets/car.png"/>
    </div>

    <div class="col-sm-9" id="title">
      <label>{{ Title }}</label>
    </div>

    <div class="col-sm-1">
      <v-toolbar-items class="hidden-sm-and-down" id="btn-logout">
        <v-btn flat @click="logout"> Log out</v-btn>
      </v-toolbar-items>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'vuetify/dist/vuetify.min.css'
export default {
  name: 'Header',
  props: ['Title'],
  methods: {
    logout () {
      this.$router.push('/login')
      this.$cookies.remove('userToken')
    }
  }
}
</script>

<style scoped>
  #toolBar {
    height: 5rem;
    background-color: rgb(162, 235, 186);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  #ico {
    text-align: left;
  }
  img {
    width: 6rem;
    height: 5rem;
    margin-left: 2rem;
  }
  #title {
    text-align: left;
    line-height: 5rem;
  }
  label {
    margin-left: 2.5rem;
    vertical-align: middle;
    font-size: 2.5rem;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }
  #btn-logout {
    height: 5rem;
    margin-left: 3rem;
  }
</style>
