<template>
  <v-container fluid class="type-sprites pa-0 ma-0">
    <v-img :src="imgSrc"></v-img>
  </v-container>
</template>

<script>
import Bug from "../../assets/Bug.png";
import Dark from "../../assets/Dark.png";
import Dragon from "../../assets/Dragon.png";
import Electric from "../../assets/Electric.png";
import Fairy from "../../assets/Fairy.png";
import Fighting from "../../assets/Fighting.png";
import Fire from "../../assets/Fire.png";
import Flying from "../../assets/Flying.png";
import Ghost from "../../assets/Ghost.png";
import Grass from "../../assets/Grass.png";
import Ground from "../../assets/Ground.png";
import Ice from "../../assets/Ice.png";
import Normal from "../../assets/Normal.png";
import Poison from "../../assets/Poison.png";
import Psychic from "../../assets/Psychic.png";
import Rock from "../../assets/Rock.png";
import Steel from "../../assets/Steel.png";
import Water from "../../assets/Water.png";

export default {
  name: "type-sprites",
  data() {
    return {
      typeImgSrc: [
        { bug: Bug },
        { dark: Dark },
        { dragon: Dragon },
        { electric: Electric },
        { fairy: Fairy },
        { fighting: Fighting },
        { fire: Fire },
        { flying: Flying },
        { ghost: Ghost },
        { grass: Grass },
        { ground: Ground },
        { ice: Ice },
        { normal: Normal },
        { poison: Poison },
        { psychic: Psychic },
        { rock: Rock },
        { steel: Steel },
        { water: Water }
      ]
    };
  },
  computed: {
    /*eslint-disable*/
    imgSrc: function() {
      var url = null;
      this.typeImgSrc.forEach(element => {
        for (let [key, value] of Object.entries(element)) {
          if (key == this.type) {
            url = value;
          }
        }
      });

      return url;
    }
  },
  props: {
    type: {
      type: String,
      default: () => {
        return null;
      }
    }
  }
};
</script>