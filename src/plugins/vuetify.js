import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {

        primary: "#F4ED71",
        secondary: "#8A8604",
        tertiary: "#CAC7D7",
      }
    }
  }
});
