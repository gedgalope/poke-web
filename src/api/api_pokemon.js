import api from './api'
/*eslint-disable*/
export default {
  async getDailyPokemon() {
    var ranId = Math.ceil(Math.random() * (807 - 1) + 1);
    const pokeData = await api().get("pokemon/" + ranId).then((res) => { //pichu172 sekmer705 eevee133 odish182 35clefairy 137porygon
    // const pokeData = await api().get("pokemon/182/").then((res) => {

      return res;
    }).catch((err) => {
      console.log(err);
    });
    return pokeData;
  },

  async getPokemonAbility(abilityUrl) {
    const buffer = abilityUrl.map(async ability => {
      const abilityBuffer = await getDataFromURL(ability);
      // console.log(abilityBuffer.data.effect_entries[0].short_effect)
      return abilityBuffer
    })
    const abilities = await Promise.all(buffer)
    // console.log(abilities);
    return abilities
  },
  async getHeldItems(itemsUrl) {
    const buffer = itemsUrl.map(async items => {
      const itemBuffer = await getDataFromURL(items)
      return itemBuffer
    })
    // console.log(buffer);
    const heldItem = await Promise.all(buffer)
    return heldItem
  },
  async getEvolutionChain(speciesUrl) {
    //get evolution chain URL
    const speciesDataBuffer = await getDataFromURL(speciesUrl).then(res => {
      return res;
    }).catch(err => {
      console.log(err)
    });
    // console.log(speciesDataBuffer);

    //get evolution chain
    const evolutionChainData = await getDataFromURL(speciesDataBuffer.evolution_chain.url).then(res => {
      return res;
    }).catch((err) => {
      console.log(err);
    });
    if (evolutionChainData == null) {
      return null;
    } else {
      //get sprites for evolution chain
      var primary, formSprites = [];
      //get base form
      primary = await evolutionChainData.chain.species.name;
      const evolutionSprite = await getData(primary);

      // console.log(evolutionSprite.sprites)
      formSprites.push({
        'forms': evolutionSprite.sprites.front_default, 'triggers': null, 'finalStage': function stage() {
          if (!evolutionChainData.chain.evolves_to.length) {
            return true
          } else {
            return false
          }
        }
      });

      //get secondary and final forms
      if (evolutionChainData.chain.evolves_to.length) {
        var formBuffer = evolutionChainData.chain.evolves_to;
        const secondary = await evolutionKeys(formBuffer);
        formSprites.push(secondary);
        // console.log(secondary) array si secondary so i access nato map or for each??
        // console.log(secondary[0].finalStage)
        if (secondary[0].finalStage != null) {
          const result = secondary.map(async elem => {
            // console.log(elem)
            const tertiary = await evolutionKeys(elem.finalStage);
            return tertiary
            // console.log(`tertiary ${tertiary}`)
          });
          var test = await Promise.all(result)
          // console.log( test[0]);
          formSprites.push(test[0])
        }
      }
      // console.log(await Promise.all(formSprites))

      return Promise.all(formSprites);
    }
  },
  async getType(typeURL) {
    var typeBuffer = typeURL.map(async element => {
      const result = await getDataFromURL(element).then((res) => {
        return res
      }).catch((err) => {
        console.log(err);
      });
      return result
    });
    return Promise.all(typeBuffer)
  }
}
async function getDataFromURL(URL) {
  const index = URL.indexOf("v2");
  URL.slice(index + 3);
  const dataBuffer = await api().get(URL).then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
  });

  return dataBuffer.data;
}

async function getData(params) {
  const dataBuffer = await api().get("pokemon/" + params).then((res) => {
    return res;
  }).catch((err) => {
    console.log(err);
  });
  return dataBuffer.data
}
async function getEvolutionDetails(details) {
  let evoKeys = { name: null, min_level: null, keys: [] };
  details.forEach(async element => {
    var ifByLvl = false;
    if (element.trigger.name == "level-up") ifByLvl = true;
    else ifByLvl = false;
    evoKeys.name = element.trigger.name;
    evoKeys.min_level = element.min_level;
    for (let [key, value] of Object.entries(element)) {
      // console.log(`${key}:${value}`); 
      if (value == null);
      else if (value == "");
      else if (!value);
      else if (key == "trigger");
      else {
        if (ifByLvl && key != 'min_level') {
          if (value == true) {
            if (key.includes('overworld')) {
              const char = key.split('_');
              evoKeys.keys.push(`${char[2]}+`)
            }
            else evoKeys.keys.push(key);
          } else if (key.includes('location')) {
            const miscKeys = Object.fromEntries([[key, value]]);
            var test = { trigger: 'location' }
            evoKeys.keys.push({ ...test, ...miscKeys.location })
            // evoKeys.keys.push(`{${key}:${value}}`)
          }
          else {
            const miscKeys = Object.fromEntries([[key, value]]);
            evoKeys.keys.push([key, value])
            // evoKeys.keys.push(miscKeys)

          }
        } else {
          var lvlUpKeyObj;
          const miscKeys = Object.fromEntries([[key, value]]);
          if (key.includes("item")) {
            // console.log(miscKeys)
            // console.log(miscKeys.item.url)
            var resBuffer;
            if (key.includes("held")) {
              resBuffer = await getDataFromURL(miscKeys.held_item.url).then((res) => {
                return res
              }).catch((err) => {
                console.log(err)
              })
            } else {
              resBuffer = await getDataFromURL(miscKeys.item.url).then((res) => {
                return res
              }).catch((err) => {
                console.log(err)
              })
            }

            const itemSprite = await resBuffer
            // lvlUpKeyObj = { ...element.trigger, ...itemSprite.sprites }
            evoKeys.keys[0] = itemSprite.sprites.default
          }
          else {
            lvlUpKeyObj = { ...element.trigger, ...miscKeys }

          }
          // evoKeys = lvlUpKeyObj;
          // console.log(lvlUpKeyObj)
        }
      }
    }
  });

  // console.log(evoKeys)
  return evoKeys;

}
async function evolutionKeys(pokemonParams) {
  const remainingForms = pokemonParams.map(async (itemsInBuffer) => {
    var forms = [], triggerInfo = [], finalStage = false;
    const evoSprite = await getData(itemsInBuffer.species.name);
    const triggerdetails = await getEvolutionDetails(itemsInBuffer.evolution_details);
    triggerInfo.push(await triggerdetails)
    forms.push(await evoSprite.sprites.front_default);
    if (itemsInBuffer.evolves_to.length) finalStage = itemsInBuffer.evolves_to;
    else finalStage = null;
    return { 'forms': forms, 'triggers': triggerInfo, 'finalStage': finalStage };
  });
  const data = await Promise.all(remainingForms)
  // console.log(data)
  return data;
}