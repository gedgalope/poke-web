import pokemon from '../../api/api_pokemon'
/*eslint-disable*/
const state = {
  dailyPokemon: null,
  abilityDesc: null,
  heldItems: null,
  evolutionSprites: null,
  primarySprite: null,
  secondarySprite: null,
  tertiarySprite: null,
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
  }
}

const mutations = {
  UPDATE_DAILY_POKEMON(state, payload) {
    state.dailyPokemon = payload;
  },
  UPDATE_ABILITY_DESC(state, payload) {
    state.abilityDesc = payload
  },
  UPDATE_ITEM(state, payload) {
    state.heldItems = payload
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
    // console.log(abilityUrl)
    // await abilityUrl.forEach(async element => {
    //   var buffer;
    //   buffer = await pokemon.getPokemonAbility(element);
    //   abilityBuffer.push(buffer)
    //   // abilityBuffer.push(buffer.map(element=>element.data.effect_entries[0].effect))
    // }); 
    // // abilityBuffer = await pokemon.getPokemonAbility() 
    // // console.log(abilityBuffer);

    var abilityBuffer;
    abilityBuffer = await pokemon.getPokemonAbility(abilityUrl)

    commit("UPDATE_ABILITY_DESC", await Promise.all(abilityBuffer));
  },
  async heldItems({ commit }, itemUrl) {
    var itemBuffer;
    itemBuffer = await pokemon.getHeldItems(itemUrl);
    // console.log(test)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}