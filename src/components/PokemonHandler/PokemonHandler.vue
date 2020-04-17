<template>
  <v-container class="pokemon-handler">
    <v-card v-if="isLoading">
      <loading-handler :isLoading="isLoading"></loading-handler>
    </v-card>
    <v-card v-else>
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
        <v-row v-if="primarySprites == null" justify="center">
          <v-col cols="10">
            <v-text-field color="success" loading disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <v-col cols="8">
            <v-card flat>
              <v-card-title class="pb-0">
                <v-container class="text-center pb-0">Evolution Chain:</v-container>
              </v-card-title>
              <v-container class="pt-0">
                <v-row justify="center">
                  <v-col cols="3">
                    <v-container v-if="typeof primarySprites !='undefined'">
                      <v-row justify="end">
                        <v-col cols="8">
                          <template v-for="(item, index) in primarySprites">
                            <v-img v-if="typeof item == `string`" :key="index" :src="item"></v-img>
                          </template>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="3">
                    <sprite-handler :sprites="secondarySprites"></sprite-handler>
                  </v-col>
                  <v-col cols="3" v-if="tertiarySprites != null">
                    <sprite-handler :sprites="tertiarySprites"></sprite-handler>
                  </v-col>
                </v-row>
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
                    <v-row>
                      <template v-for="(type, index) in pokeData.types">
                        <!-- <span :key="index">{{type.type.name}} {{'\t'}}</span> -->
                        <v-col cols="6" :key="index">
                          <type-sprites :type="type.type.name"></type-sprites>
                        </v-col>
                      </template>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-card class="vcard" height="100%">
              <v-card-title>Abilities:</v-card-title>
              <v-card-text class="pa-1" v-for="(ability, index) in abilityDesc" :key="index">
                <v-expansion-panels focusable>
                  <v-expansion-panel>
                    <v-expansion-panel-header ripple>{{ability.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-if="typeof ability.effect != 'undefined'"
                    >{{ability.effect}}</v-expansion-panel-content>
                    <v-expansion-panel-content v-else>
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
              <v-card-text>
                <v-card>
                  <template v-for="(types,index) in damageRelations">
                    <span :key="index">
                      <v-card-title class="subtitle-1 py-0">{{damRel(index)}}</v-card-title>
                      <v-card-text>
                        <v-row>
                          <template v-for="(type, index) in types">
                            <v-col :key="index" class="pa-1" :cols="4">
                              <type-sprites :type="type"></type-sprites>
                            </v-col>
                          </template>
                        </v-row>
                      </v-card-text>
                    </span>
                  </template>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="vcard" height="100%">
              <v-card-title>Held Items:</v-card-title>
              <v-card-text v-if="typeof pokeData.held_items != 'object'">None</v-card-text>
              <template v-else v-for="(item, index) in heldItems">
                <v-card-text :key="index">
                  <!-- {{held_Item}} -->
                  <v-row>
                    <v-col cols="4">
                      <v-img :src="item.sprite" width="50px" height="50px"></v-img>
                    </v-col>
                    <v-col cols="8">
                      <v-row class="text-capitalize" justify="center">{{item.name}}</v-row>
                      <v-row justify="center">{{item.effect}}</v-row>
                    </v-col>
                  </v-row>
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
import { mapGetters, mapActions } from "vuex";
import SpriteHandlerVue from "../Evolution/SpriteHandler.vue";
import LoadingHandlerVue from "../util/LoadingHandler.vue";
import TypeSpritesVue from "../util/TypeSprites.vue";
/*eslint-disable*/
export default {
  name: "pokemon-handler",
  components: {
    "sprite-handler": SpriteHandlerVue,
    "loading-handler": LoadingHandlerVue,
    "type-sprites": TypeSpritesVue
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted: function() {
    this.populateData();
  },
  computed: {
    ...mapGetters({
      abilityDesc: "pokemon/getAbilityDesc",
      heldItems: "pokemon/getHeldItems",
      primarySprites: "pokemon/getPrimarySprites",
      secondarySprites: "pokemon/getSecondarySprites",
      tertiarySprites: "pokemon/getTertiarySprites",
      damageRelations: "pokemon/getDamageRelations"
    })
  },
  methods: {
    ...mapActions({
      abilityDescription: "pokemon/abilityDescription",
      held_Items: "pokemon/heldItems",
      evolutionChain: "pokemon/evolutionChain",
      getTypeInfo: "pokemon/getTypeInfo"
    }),
    populateData() {
      const abilitiesUrl = this.pokeData.abilities.map(
        elem => elem.ability.url
      );
      const typeURL = this.pokeData.types.map(elem => elem.type.url);
      const itemUrl = this.pokeData.held_items.map(elem => elem.item.url);
      this.abilityDescription(abilitiesUrl);
      this.held_Items(itemUrl);
      this.evolutionChain(this.pokeData.species.url);
      this.getTypeInfo(typeURL);
      // this.$store.dispatch("pokemon/abilityDescription", abilitiesUrl);
      // this.$store.dispatch("pokemon/heldItems", itemUrl);
      // this.$store.dispatch("pokemon/evolutionChain", this.pokeData.species.url);
      this.isLoading = false;
    },
    damRel(index) {
      if (index == "double") {
        return "Double Damage";
      } else if (index == "half") {
        return "Half Damage";
      } else {
        return "No Damage";
      }
    },
  },
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