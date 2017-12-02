import React from 'react';
import Pokemon from './Pokemon';
import PokemonStats from './PokemonStats';
import css from '../styles.css';

function GameView(props) {
  return (
    <div className={css.battleField}>
      <div className={css.pokeView}>
        <PokemonStats stats={props.opponent.pokemon[0]} />
        { 
          props.opponent.pokemon[0] ? <Pokemon sprite={props.opponent.pokemon[0].sprites.front_default} type="opponent" /> : <div></div>
        }
      </div>
      {
        props.pokemon[0] ?
        <div className={css.pokeView}>
          <Pokemon sprite={props.pokemon[0] ? props.pokemon[0].sprites.back_default : ''} attacking={props.attacking} />
          <PokemonStats stats={props.pokemon[0]} />
        </div> : <div></div>
      }
      
    </div>
  );
}

export default GameView;
