import React from 'react';
import css from '../styles.css';

function PokemonStats(props) {
  return (
    <div className={css.stats}>
      <h2>{props.stats.name.toUpperCase()}</h2>
      <h4 style={{ marginBottom: '2px' }}> {props.stats.health} / {props.stats.initialHealth} </h4>
      <h6 style={{ marginTop: '5px' }}> atk: {props.stats.attack} - def: {props.stats.defense} </h6>
    </div>
  );
}

export default PokemonStats;
