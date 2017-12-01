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
      name: moveInfo.name,
      power: moveInfo.basePower,
      accuracy: moveInfo.accuracy,
      category: moveInfo.category,
      type: moveInfo.type,
      isZ: moveInfo.isZ,
    });
  });

  console.log(moveMap.get(403));
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
  for (let i = moveSet.length - 1; i >= moveSet.length - 4; i -= 1) {
    moves.push(moveMap.get(Number(moveSet[i])));
  }

  console.log(name, moves);

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
    // moveSet,
    moves,
  };
};

const createPlayer = (player, number) => {
  const random = () => Math.ceil(Math.random() * 150);
  return new Promise((resolve, reject) => {
    const pokemonCalls = [];
    for (let i = 0; i < 3; i += 1) {
      pokemonCalls.push(db.Pokemon.findOne({ where: { id: random() } }));
    }
    Promise.all(pokemonCalls)
      .then((results) => {
        const pokemon = [];
        results.forEach(result => pokemon.push(createPokemon(result)));
        resolve({
          player: number,
          name: player.name,
          pokemon,
        });
      })
      .catch(err => reject(err));
  });
};

// const createTurnlog = (game, turn, type) => {
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
