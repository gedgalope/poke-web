import pokemon from '../../api/api_pokemon'
/*eslint-disable*/
const state = {
  dailyPokemon: null,
  abilityDesc: null,
  heldItems: [],
  evolutionSprites: null,
  primarySprite: null,
  secondarySprite: null,
  tertiarySprite: null,
  damage_relations:null,
}

const getters = {
  getDailyPokemon: state => {
    return state.dailyPokemon;
  },
  getAbilityDesc: state => {
    return state.abilityDesc;
  },
  getHeldItems: state => {
    return state.heldItems;
  },
  getPrimarySprites: state => {
    return state.primarySprite;
  },
  getSecondarySprites: state => {
    return state.secondarySprite;
  },
  getTertiarySprites: state => {
    return state.tertiarySprite;
  },
  getDamageRelations:state =>{
    return state.damage_relations
  }
}

const mutations = {
  UPDATE_DAILY_POKEMON(state, payload) {
    state.dailyPokemon = payload;
  },
  UPDATE_ABILITY_DESC(state, payload) {
    // console.log(payload)
    var abilityArray = []
    payload.forEach(element => {
      var abilityBuffer = { name: null, effect: null }
      abilityBuffer.name = element.name
      abilityBuffer.effect = element.effect_entries[0].short_effect
      abilityArray.push(abilityBuffer)
    });
    state.abilityDesc = abilityArray
  },
  UPDATE_ITEM(state, payload) {
    // console.log(payload);
    var itemArray = []
    payload.forEach(element => {
      var itembuffer = { sprite: null, name: null, effect: null }
      itembuffer.name = element.name,
        itembuffer.sprite = element.sprites.default
      itembuffer.effect = element.effect_entries[0].short_effect
      itemArray.push(itembuffer)
    });
    // console.log(itemArray)
    state.heldItems = itemArray
  },
  UPDATE_SPRITES(state, payload) {
    console.log(payload)
    if (payload[0].finalStage) {
      state.primarySprite = payload[0]
      if (payload.length >= 2) {
        state.secondarySprite = payload[1]
      }
      if (payload.length >= 3) {
        state.tertiarySprite = payload[2]

      }
    }
  },
  UPDATE_DAMAGE_RELATIONS(state, payload){
    state.damage_relations = payload
  }
}

const actions = {
  async dailyPokemon({ commit }) {
    try {
      let pokeData = await pokemon.getDailyPokemon();
      // console.log(pokeData);
      commit("UPDATE_DAILY_POKEMON", pokeData);
    } catch (error) {
      pokeData = { data: '-1' };
      console.log(error);
      commit("UPDATE_DAILY_POKEMON", pokeData);
    }
  },
  async abilityDescription({ commit }, abilityUrl) {
    var abilityBuffer;
    abilityBuffer = await pokemon.getPokemonAbility(abilityUrl)

    commit("UPDATE_ABILITY_DESC", await Promise.all(abilityBuffer));
  },
  async heldItems({ commit }, itemUrl) {
    var itemBuffer;
    itemBuffer = await pokemon.getHeldItems(itemUrl);
    // console.log(itemUrl)
    // console.log(await Promise.all(itemBuffer))
    commit("UPDATE_ITEM", await Promise.all(itemBuffer));
  },
  async evolutionChain({ commit }, speciesUrl) {
    // console.log(speciesUrl)
    const evoSprites = await pokemon.getEvolutionChain(speciesUrl).then((res) => {
      return res;
    })
    // console.log(evoSprites);
    commit("UPDATE_SPRITES", evoSprites)
  },
  async getTypeInfo({ commit }, typeURL) {
    const typeInfo = await pokemon.getType(typeURL).then((res) => {
      return res;
    })
    var damRelations = { double:null, half:null, nodam:null }
    console.log(typeInfo)


    if (typeURL.length == 1) {
      damRelations.double = typeInfo[0].damage_relations.double_damage_from.map(elem => elem.name)
      damRelations.half = typeInfo[0].damage_relations.half_damage_from.map(elem => elem.name)
      damRelations.nodam = typeInfo[0].damage_relations.no_damage_from.map(elem => elem.name)
    } else {
      typeInfo.forEach(element => {
        damRelations.double = element.damage_relations.double_damage_from.map(elem => elem.name)
        damRelations.half = element.damage_relations.half_damage_from.map(elem => elem.name)
        damRelations.nodam = element.damage_relations.no_damage_from.map(elem => elem.name)
      })
    }
    commit("UPDATE_DAMAGE_RELATIONS",damRelations)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}