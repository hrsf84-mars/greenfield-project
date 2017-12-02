import React, { Component } from 'react';
import css from '../styles.css';

const PokemonOptions = (props) => {
  return (
    <div className={css.listPokemon}>
      <h3>Your Options</h3>
      <br />
      <div className={css.teamList}>
        {props.teamCount < 3 ? props.renderOptions() : null}
      </div>
      <br />
      <br />
      <button onClick={props.handleAddPokemon} className={css.gameButton}>Choose Pokemon</button>
    </div>
  );
};

export default PokemonOptions;
