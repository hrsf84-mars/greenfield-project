import React, { Component } from 'react';
import css from '../styles.css';

import PokemonCard from './PokemonCard.jsx';

const GameState = (props) => {
  return (
    <div className={css.gameStateContainer}>
      {JSON.stringify(props.pokemon) === '[]' ? <h5>Awaiting your pokemon...</h5> : props.pokemon.map(poke => {
        return <PokemonCard {...poke} key={poke.name} clickHandler={() => {props.handleChoose(poke.name)}} />
      })}
    </div>
  )
}

export default GameState; 