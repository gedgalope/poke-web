<template>
  <v-container class="home-page">
    <daily-pokemon></daily-pokemon>
  </v-container>
</template>

<script>
import DailyPokemonVue from '../components/Home/DailyPokemon.vue';
export default {
  name: 'home',
  components: {
    'daily-pokemon':DailyPokemonVue
  }
}
</script>
