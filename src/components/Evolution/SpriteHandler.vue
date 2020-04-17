<template>
  <v-container fluid class="fill-height sprite-handler py-0">
    <v-row v-for="(sprite, index) in sprites" :key="index" justify="center">
      <v-col cols="4">
        <v-row justify="center">
          <icon-handler viewBox="0 0 41.999 41.999">
            <arrow-svg></arrow-svg>
          </icon-handler>
        </v-row>
        <template v-for="(trigger, index) in sprite.triggers">
          <span :key="index">
            <v-row v-if="trigger.name=='level-up'" justify="center">
              <span class="font-weight-thin text-capitalized caption">{{trigger.name}}</span>
              <span class="font-weight-thin text-capitalized caption">{{trigger.min_level}}</span>
              <icon-handler
                v-if="checkEvolutionKeys(trigger.keys).name == 'day'"
                viewBox="0 0 497 497"
                iconName="day"
                height="35"
                width="35"
              >
                <day-svg></day-svg>
              </icon-handler>
              <icon-handler
                v-else-if="checkEvolutionKeys(trigger.keys).name == 'night'"
                viewBox="0 0 512 512"
                iconName="night"
                height="25"
                width="25"
              >
                <night-svg></night-svg>
              </icon-handler>
              <icon-handler
                v-else-if="checkEvolutionKeys(trigger.keys).name == 'location'"
                viewBox="0 0 511.99 511.99"
                :iconName="checkEvolutionKeys(trigger.keys).trigger"
                height="30"
                width="30"
              >
                <pokemon-location></pokemon-location>
              </icon-handler>
              <icon-handler
                v-else-if="checkEvolutionKeys(trigger.keys).name == 'move'"
                viewBox="0 0 256 256"
                :iconName="checkEvolutionKeys(trigger.keys).trigger"
                height="45"
                width="45"
              >
                <attack-svg></attack-svg>
              </icon-handler>
              <v-icon
                v-if="checkEvolutionKeys(trigger.keys).name=='happiness'"
                color="pink"
              >mdi-heart</v-icon>
            </v-row>
            <v-row v-else-if="trigger.name == 'use-item'">
              <!-- {{trigger.keys}} -->
              <template v-for="(key,index) in trigger.keys">
                <span :key="index">
                  <span v-show="false">{{key}}</span>
                  <v-img v-if="typeof key !='undefined'" :src="key"></v-img>
                </span>
              </template>
            </v-row>
            <v-row v-else-if="trigger.name == 'trade'">
              <!-- {{trigger.keys}} -->
              <template v-for="(key,index) in trigger.keys">
                <span :key="index">
                  <span v-show="false">{{key}}</span>
                  <v-img v-if="typeof key !='undefined'" :src="key"></v-img>
                  <span v-else>trade</span>
                </span>
              </template>
            </v-row>
          </span>
        </template>
      </v-col>
      <v-col
        align="center"
        class="pa-0"
        cols="8"
        v-for="(imgsrc, index) in sprite.forms"
        :key="index"
      >
        <v-img :src="imgsrc"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*eslint-disable*/
import IconHandlerVue from "../util/IconHandler.vue";
import ArrowSVG from "../util/Icons/ArrowSVG";
import DaySVG from "../util/Icons/DaySVG";
import NightSVG from "../util/Icons/NightSVG";
import PokemonLocationSVG from "../util/Icons/PokemonLocationSVG";
import AttackSVG from "../util/Icons/AttackSVG";

export default {
  name: "sprite-handler",
  data() {
    return {};
  },
  components: {
    "icon-handler": IconHandlerVue,
    "arrow-svg": ArrowSVG,
    "day-svg": DaySVG,
    "night-svg": NightSVG,
    "pokemon-location": PokemonLocationSVG,
    "attack-svg": AttackSVG
  },
  methods: {
    checkEvolutionKeys(keys) {
      // console.log(keys);
      var trigger = { name: null, trigger: null };
      var miscTrigger = keys.map(element => {
        // console.log(trigger)
        // element.find(elem => elem == 'min_happinesss'
        if (Array.isArray(element)) {
          var mode_in_next_index = false;
          element.find(elem => {
            // console.log(typeof elem)
            if (typeof elem == "string" && elem.includes("happiness")) {
              trigger.name = "happiness";
            } else if (typeof elem == "string" && elem.includes("time")) {
              mode_in_next_index = true;
            } else if (typeof elem == "string" && mode_in_next_index) {
              trigger.name = elem;
            } else if (typeof elem == "object" && mode_in_next_index) {
              trigger.trigger = `${elem.name} move`;
              // trigger.trigger =elem
            } else if (typeof elem == "string" && elem.includes("move")) {
              // console.log(elem)
              trigger.name = "move";
              mode_in_next_index = true;
            }
          });
        } else if (element.trigger == "location") {
          trigger.name = "location";
          // console.log(element.name)
          return element.name;
        }
      });

      if (trigger.name == "location") {
        trigger.trigger = miscTrigger;
        return trigger;
      }
      return trigger;
    }
  },
  props: {
    sprites: {
      type: Array,
      default: () => {
        return null;
      }
    }
  }
};
</script>

<style scoped>
</style>