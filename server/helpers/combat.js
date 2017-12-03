const { damageCalculation } = require('../../game-logic');
const { createTurnlog } = require('./creators');

const processSwitches = (game, player, moveIdx, io, gameid) => {
  player.pokemon.unshift(player.pokemon.splice(moveIdx, 1)[0]);
  const turnlog = createTurnlog(player, null, null, 'switch');
  io.to(gameid).emit('attack processed', {
    basicAttackDialog: turnlog,
  });
};

const processAttacks = (game, attacker, defender, moveIdx, io, gameid) => {
  const attackingPokemon = attacker.pokemon[0];
  const attackingMove = moveIdx >= 0 ? attackingPokemon.moves[moveIdx] : {
    name: 'attack',
    power: 30,
    accuracy: 80,
    category: attacker.pokemon[0].attack > attacker.pokemon[0].specialAttack ? 'physical' : 'special',
    type: attacker.pokemon[0].types[0],
    isZ: false,
  };
  // console.log(attackingMove);
  const turnResults = damageCalculation(attacker, defender, attackingMove);
  const targetPokemon = defender.pokemon[0];
  targetPokemon.health -= turnResults.damageToBeDone;

  const turnlog = createTurnlog(attacker, defender, turnResults, 'attack');
  io.to(gameid).emit('attack processed', {
    basicAttackDialog: turnlog,
  });
};

exports.resolveTurn = (game, p1Move, p1MoveIdx, p2Move, p2MoveIdx, io, gameid) => {
  console.log('resolving turn');
  const p1 = game.player1;
  const p2 = game.player2;
  // const p1Pokemon = p1.pokemon[0];
  // const p2Pokemon = p2.pokemon[0];
  const isP1Faster = p1.pokemon[0].speed >= p2.pokemon[0].speed;
  const fast = {
    // player: p1,
    player: isP1Faster ? p1 : p2,
    move: isP1Faster ? p1Move : p2Move,
    moveIdx: isP1Faster ? p1MoveIdx : p2MoveIdx,
  };
  const slow = {
    // player: p2,
    player: isP1Faster ? p2 : p1,
    move: isP1Faster ? p2Move : p1Move,
    moveIdx: isP1Faster ? p2MoveIdx : p1MoveIdx,
  };

  // handle switches
  if (fast.move === 'switch') {
    processSwitches(game, fast.player, fast.moveIdx, io, gameid);
  }
  if (slow.move === 'switch') {
    processSwitches(game, slow.player, slow.moveIdx, io, gameid);
  }

  // handle attacks
  if (fast.move === 'attack') {
    processAttacks(game, fast.player, slow.player, fast.moveIdx, io, gameid);
  }
  if (slow.move === 'attack' && slow.player.pokemon[0].health > 0) {
    processAttacks(game, slow.player, fast.player, slow.moveIdx, io, gameid);
  }

  // handle KO
  const p1Pokemon = p1.pokemon[0];
  const p2Pokemon = p2.pokemon[0];
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
    // console.log(game);
    io.to(gameid).emit('turn move', game);
  }
};
