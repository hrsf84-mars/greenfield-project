const https = require('https');

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const reducePokemon = function(resData) {
  pokeData = {
    id: resData.id,
    name: resData.forms[0].name,
    baseDefense: resData.stats[3].base_stat,
    baseAttack: resData.stats[4].base_stat,
    baseHealth: resData.stats[5].base_stat,
    types: resData.types.map(obj => obj.type.name),
    backSprite: resData.sprites.back_default,
    frontSprite: resData.sprites.front_default,
  };
  return pokeData;
};


for (var id = 146; id < 151; id += 1) {
  https.get(pokeAPI + id + '/', (res) => {
    // console.log(res.statusCode);
    var resData = '';
    res.on('data', (chunk) => {
      resData += chunk;
    })
      .on('end', () => {
        const pokeData = reducePokemon(JSON.parse(resData));
        console.log(JSON.stringify(pokeData));
      })
      .on('error', (err) => {
        console.log(err);
      });
  });
}
