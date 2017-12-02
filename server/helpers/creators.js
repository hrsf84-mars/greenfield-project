const db = require('../../database/db.js');
const { calculateBaseHealth, calculateBaseStat } = require('../../game-logic');
const { BattleMovedex } = require('../../database/moves');

/*

====== Game Creation Helpers ========

These functions help shape the data that ultimately build up the state of each
game. They return correctly parsed data that the client will eventually be expecting,
which will be emitted from the socket connection within server/app.js

*/

const createMoveMap = () => {
  const allMoves = Object.values(BattleMovedex);
  const moveMap = new Map();
  allMoves.filter(({ basePower, isZ }) => basePower > 0 && !isZ).forEach((moveInfo) => {
    moveMap.set(moveInfo.num, {
      name: moveInfo.name.toLowerCase(),
      power: moveInfo.basePower,
      accuracy: moveInfo.accuracy,
      category: moveInfo.category.toLowerCase(),
      type: moveInfo.type.toLowerCase(),
      isZ: moveInfo.isZ,
    });
  });

  // console.log('MOVELIST LENGTH: ', allMoves.length);
  return moveMap;
};

const moveMap = createMoveMap();

const createPokemon = (pokemon) => {
  // console.log(pokemon.types);
  // console.log(pokemon.name);
  // console.log(pokemon.frontSprite, pokemon.backSprite);
  // console.log(pokemon.baseSpecialAttack, pokemon.baseSpecialDefense, pokemon.baseSpeed);
  // console.log(pokemon.moveSet);
  const {
    name,
    baseHealth,
    baseAttack,
    baseDefense,
    baseSpecialAttack,
    baseSpecialDefense,
    baseSpeed,
    frontSprite,
    backSprite,
    types,
    moveSet,
  } = pokemon;
  const scaledHealth = calculateBaseHealth(baseHealth);
  const moves = [];
  let cnt = 0;
  for (let i = 0; i < moveSet.length; i += 1) {
    const move = moveMap.get(moveSet[i]);
    if (move) {
      moves.push(move);
      cnt += 1;
      if (cnt >= 4) {
        break;
      }
    }
  }

  const detailedMoveSet = [];
  for (let i = 0; i < moveSet.length; i += 1) {
    const move = moveMap.get(moveSet[i]);
    if (move) {
      detailedMoveSet.push(move);
    }
  }

  return {
    name,
    health: scaledHealth,
    initialHealth: scaledHealth,
    attack: calculateBaseStat(baseAttack),
    defense: calculateBaseStat(baseDefense),
    specialAttack: calculateBaseStat(baseSpecialAttack),
    specialDefense: calculateBaseStat(baseSpecialDefense),
    speed: calculateBaseStat(baseSpeed),
    sprites: { front_default: frontSprite, back_default: backSprite },
    types,
    moveSet: detailedMoveSet,
    moves,
  };
};

const createPokemonArr = () => {
  const random = () => Math.ceil(Math.random() * 150);
  return new Promise((resolve, reject) => {
    const pokemonCalls = [];
    const indices = [];
    while (pokemonCalls.length < 9) {
      let randomnum = random();
      if (!indices.includes(randomnum)) {
        pokemonCalls.push(db.Pokemon.findOne({ where: { id: randomnum } }));
        indices.push(randomnum);
      } else {
        randomnum = random();
      }
    }
    Promise.all(pokemonCalls)
      .then((results) => {
        const pokemonmini = [];
        results.forEach(result => pokemonmini.push(createPokemon(result)));
        resolve(pokemonmini);
      })
      .catch(err => reject(err));
  });
};

const createPlayer = (player, number) => (
  // returns a new promise
  new Promise((resolve, reject) => {
    createPokemonArr()
      .then((pokes) => {
        // console.log('pokes length', pokes.length);
        const pokemon = [];
        for (let i = 0; i < 9; i += 3) {
          pokemon.push(pokes.slice(i, (i + 3)));
        }
        resolve({
          player: number,
          name: player.name,
          pokemon,
          ready: false,
        });
      })
      .catch(err => reject(err));
  })
);

const createTurnlog = (player, opponent, turn, type) => {
  const playerPokemonName = player.pokemon[0].name;
  if (type === 'attack') {
    const opponentPokemonName = opponent.pokemon[0].name;
    const turnlog = [{ command: `${playerPokemonName} attacked!` }];
    if (turn.logStatement !== '') {
      turnlog.push({ command: turn.logStatement });
    }
    turnlog.push({ command: `${opponentPokemonName} lost ${turn.damageToBeDone} HP` });
    if (opponent.pokemon[0].health <= 0) {
      turnlog.push({ command: `${opponentPokemonName} has fainted!` });
    }
    return turnlog;
  } else if (type === 'switch') {
    const turnlog = [{ command: `${playerPokemonName} appears!` }];
    return turnlog;
  }
  return [];
};

module.exports = {
  createMoveMap,
  createPokemon,
  createPlayer,
  createTurnlog,
};
