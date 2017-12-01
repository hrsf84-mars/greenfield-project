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
};

exports.resolveTurn = (game, p1Move, p2Move, io, gameid) => {
  console.log('resolving turn');
  const p1 = game.player1;
  const p2 = game.player2;
  const p1Pokemon = p1.pokemon[0];
  const p2Pokemon = p2.pokemon[0];
  const isP1Faster = p1Pokemon.speed >= p2Pokemon.speed;
  // console.log(p1Pokemon, p2Pokemon, isP1Faster);
  const fast = {
    // player: p1,
    player: isP1Faster ? p1 : p2,
    move: isP1Faster ? p1Move : p2Move,
  };
  const slow = {
    // player: p2,
    player: isP1Faster ? p2 : p1,
    move: isP1Faster ? p2Move : p1Move,
  };

  // handle switches
  if (fast.move === 'switch') {
    processSwitches(game, fast.player, io, gameid);
  }
  if (slow.move === 'switch') {
    processSwitches(game, slow.player, io, gameid);
  }

  // handle attacks
  if (fast.move === 'attack') {
    processAttacks(game, fast.player, slow.player, io, gameid);
  }
  if (slow.move === 'attack' && slow.player.pokemon[0].health > 0) {
    processAttacks(game, slow.player, fast.player, io, gameid);
  }

  // handle KO
  if (p1Pokemon.health <= 0) {
    p1Pokemon.health = 0;
    if (p1.pokemon[1].health <= 0 && p1.pokemon[2].health <= 0) {
      io.to(gameid).emit('gameover', { name: p2.name });
    } else {
      io.to(gameid).emit('free switch', game);
    }
  } else if (p2Pokemon.health <= 0) {
    p2Pokemon.health = 0;
    if (p2.pokemon[1].health <= 0 && p2.pokemon[2].health <= 0) {
      io.to(gameid).emit('gameover', { name: p1.name });
    } else {
      io.to(gameid).emit('free switch', game);
    }
  } else {
    console.log('next turn');
    io.to(gameid).emit('turn move', game);
  }
};
