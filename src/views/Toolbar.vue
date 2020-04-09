<template>
  <v-app-bar class="poke-toolbar" height="90px" app>
    <v-app-bar-nav-icon>
      <icon-handler viewBox="0 0 512 512">
        <pokemon-logo></pokemon-logo>
      </icon-handler>
    </v-app-bar-nav-icon>
    <v-toolbar-title>PokéWeb</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-container fluid class="pt-3 my-0 pr-4">
        <v-row>
          <v-col cols="12">
            <v-text-field name="Search" solo placeholder="Search"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-tabs height="70" class="pt-2">
        <v-tab optional exact large class="text-capitalize subtitle-1" replace to="/">Home</v-tab>
        <v-tab optional exact large class="text-capitalize subtitle-1">List</v-tab>
        <v-tab optional exact large class="text-capitalize subtitle-1">About</v-tab>
      </v-tabs>
    </v-toolbar-items>
    <!-- 

    <v-text-field name="Search" solo placeholder="Search"></v-text-field>-->
  </v-app-bar>
</template>

<script>
import pokeLogo from "../assets/pokemon-logo.png";
import IconHandlerVue from "../components/util/IconHandler.vue";
import PokemonLogoVue from "../components/util/Icons/PokemonLogo";
export default {
  name: "poke-toolbar",
  components: {
    "icon-handler": IconHandlerVue,
    "pokemon-logo": PokemonLogoVue
  },
  data() {
    return {
      pokeLogo: pokeLogo
    };
  }
};
</script>

<style scoped>
</style>