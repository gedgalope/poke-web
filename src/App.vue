<template>
  <v-app>
    <poke-toobar/>

    <v-content>
      <!-- <HelloWorld/> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import ToolbarVue from "./views/Toolbar.vue";

export default {
  name: "App",
  components: {
    "poke-toobar": ToolbarVue
  },

  data: () => ({
    //
  })
};
</script>
