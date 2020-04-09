<template>
  <v-container fluid class="daily-pokemon">
    <v-row justify="center">
      <v-col cols="11">
        <v-alert>
          <v-card class="display-3 text-center" flat>Daily Pokemon</v-card>
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="getDailyPokemon != null">
      <pokemon-handler :pokeData="getDailyPokemon.data"></pokemon-handler>
    </v-row>
    <v-row v-else-if="getDailyPokemon == null">
      <v-text-field color="success" loading disabled></v-text-field>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PokemonHandlerVue from "../PokemonHandler/PokemonHandler.vue";
export default {
  beforeCreate() {
    this.$store.dispatch("pokemon/dailyPokemon");
  },
  name: "daily-pokemon",
  computed: {
    ...mapGetters({
      getDailyPokemon: "pokemon/getDailyPokemon"
    })
  },
  components: {
    "pokemon-handler": PokemonHandlerVue
  }
};
</script>

<style scoped>
</style>