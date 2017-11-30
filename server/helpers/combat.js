const { damageCalculation } = require('../../game-logic');
const { createTurnlog } = require('./creators');

const processSwitches = (game, player, io, gameid) => {
  const turnlog = createTurnlog(player, null, null, 'switch');
  io.to(gameid).emit('attack processed', {
    basicAttackDialog: turnlog,
  });
};

const processAttacks = (game, attacker, defender, io, gameid) => {
  const turnResults = damageCalculation(attacker, defender);
  const targetPokemon = defender.pokemon[0];
  targetPokemon.health -= turnResults.damageToBeDone;

  const turnlog = createTurnlog(attacker, defender, turnResults, 'attack');
  io.to(gameid).emit('attack processed', {
    basicAttackDialog: turnlog,
  });
  if (
    defender.pokemon[0].health <= 0 &&
    defender.pokemon[1].health <= 0 &&
    defender.pokemon[2].health <= 0
  ) {
    targetPokemon.health = 0;
    io.to(gameid).emit('gameover', { name: attacker.name });
  } else if (targetPokemon.health <= 0) {
    targetPokemon.health = 0;
  }
};

exports.resolveTurn = (game, p1Move, p2Move, io, gameid) => {
  console.log('resolving turn');
  const p1 = game.player1;
  const p2 = game.player2;
  const fast = {
    player: p1,
    move: p1Move,
  };
  const slow = {
    player: p2,
    move: p2Move,
  };
  if (fast.move === 'switch') {
    processSwitches(game, fast.player, io, gameid);
  }
  if (slow.move === 'switch') {
    processSwitches(game, slow.player, io, gameid);
  }

  if (fast.move === 'attack') {
    processAttacks(game, fast.player, slow.player, io, gameid);
  }
  if (slow.move === 'attack' && slow.player.pokemon[0].health > 0) {
    processAttacks(game, slow.player, fast.player, io, gameid);
  }

  io.to(gameid).emit('turn move', game);
};
