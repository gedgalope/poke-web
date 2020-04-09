<template>
  <v-container class="pokemon-handler">
    <v-card>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="6">
            <v-row justify="center">
              <v-col cols="3">
                <v-card class="text-center sprite-card">
                  <v-container>
                    <v-img :src="pokeData.sprites.front_default"></v-img>
                  </v-container>Normal Sprite
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="text-center sprite-card">
                  <v-container>
                    <v-img :src="pokeData.sprites.front_shiny"></v-img>
                  </v-container>Shiny Sprite
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="primarySprites==null">
          <v-col cols="10">
            <v-text-field color="success" loading disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="primarySprites!=null" justify="center">
          <v-col cols="8">
            <v-card>
              <v-card-title class="pb-0">
                <v-container class="text-center pb-0">Evolution Chain:</v-container>
              </v-card-title>
              <v-container class="pt-0">
                <v-row justify="center">
                  <v-col cols="3">
                    <v-container>
                      <v-img :src="primarySprites.forms"></v-img>
                    </v-container>
                  </v-col>
                  <v-col cols="3">
                    <sprite-handler :sprites="secondarySprites"></sprite-handler>
                  </v-col>
                  <v-col cols="3" v-if="tertiarySprites != null">
                    <sprite-handler :sprites="tertiarySprites"></sprite-handler>
                  </v-col>
                </v-row>
                <sprite-handler
                  :primarySprites="primarySprites"
                  :secondarySprites="secondarySprites"
                  :tertiarySprites="tertiarySprites"
                ></sprite-handler>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-card class="vcard text-center">
                  <v-card-title>Name:</v-card-title>
                  <v-card-text class="text-capitalize">{{pokeData.name}}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-card class="vcard">
                  <v-card-title>Type:</v-card-title>
                  <v-card-text>
                    <template v-for="(type, index) in pokeData.types">
                      <span :key="index">{{type.type.name}} {{'\t'}}</span>
                    </template>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-card class="vcard" height="100%">
              <v-card-title>Abilities:</v-card-title>
              <v-card-text class="pa-1" v-for="(ability, index) in pokeData.abilities" :key="index">
                <v-expansion-panels focusable>
                  <v-expansion-panel>
                    <v-expansion-panel-header ripple>{{ability.ability.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-if="abilityDesc != null">{{abilityDesc[index]}}</v-expansion-panel-content>
                    <v-expansion-panel-content v-else-if="abilityDesc == null">
                      <v-text-field color="success" loading disabled></v-text-field>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="vcard" height="100%">
              <v-card-title>Damage Relations:</v-card-title>
              <v-card-text v-for="(type, index) in pokeData.types" :key="index">{{type.type.name}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="vcard" height="100%">
              <v-card-title>Held Items:</v-card-title>
              <v-card-text v-if="pokeData.held_items.length == 0">None</v-card-text>
              <template v-else v-for="(held_Item, index) in pokeData.held_items">
                <v-card-text :key="index">
                  <v-row>
                    <v-col cols="4">
                      <v-img :src="heldItems[index].sprites.default" width="50px" height="50px"></v-img>
                    </v-col>
                    <v-col cols="8">
                      <v-row class="text-capitalize" justify="center">{{held_Item.item.name}}</v-row>
                      <v-row justify="center">{{heldItems[index].effect_entries[0].short_effect}}</v-row>
                    </v-col>
                  </v-row>
                  <!-- {{}} -->
                </v-card-text>
                <!-- <v-card-text :key="index">
                  {{heldItems[index]}}
                </v-card-text>-->
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SpriteHandlerVue from "../Evolution/SpriteHandler.vue";
/*eslint-disable*/
export default {
  name: "pokemon-handler",
  components: {
    "sprite-handler": SpriteHandlerVue
  },
  mounted: function() {
    const abilitiesUrl = this.pokeData.abilities.map(elem => elem.ability.url);
    const itemUrl = this.pokeData.held_items.map(elem => elem.item.url);
    this.$store.dispatch("pokemon/abilityDescription", abilitiesUrl);
    this.$store.dispatch("pokemon/heldItems", itemUrl);
    this.$store.dispatch("pokemon/evolutionChain", this.pokeData.species.url);
  },
  computed: {
    ...mapGetters({
      abilityDesc: "pokemon/getAbilityDesc",
      heldItems: "pokemon/getHeldItems",
      primarySprites: "pokemon/getPrimarySprites",
      secondarySprites: "pokemon/getSecondarySprites",
      tertiarySprites: "pokemon/getTertiarySprites"
    }),
    ...mapState({
      test: state => state.pokemon.abilityDesc
    })
  },
  methods: {},
  props: {
    pokeData: {
      type: Object,
      default: () => {
        return null;
      }
    }
  }
};
</script>

<style scoped>
.sprite-img-container {
  border-radius: 30px;
}
.vcard {
  border-radius: 30px;
  border-left: 6px solid red;
}
.sprite-card {
  border: 5px double #4caf50;
}
</style>