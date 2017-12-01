import React, { Component } from 'react';
import css from '../styles.css';

const PokemonOptions = (props) => {
  return (
    <div className={css.listPokemon}>
      <h3>Your Options</h3>
      <br />
      {props.options.map((pokemon) => {
        return (
          <div style={{ display: 'inline-block', width: '150px' }} key={pokemon.name} onClick={() => props.handleSetActive(pokemon)}>
            <img src={pokemon.sprites.front_default} alt="" />
            <h5 style={{ marginBottom: '0px', marginTop: '2px' }}>{pokemon.name}</h5>
            <h6 style={{ marginBottom: '0px' }}>{pokemon.health} / {pokemon.initialHealth}</h6>
          </div>
        );
      })}
      <br />
      <br />
      <button onClick={props.handleAddPokemon} className={css.gameButton}>Choose Pokemon</button>
    </div>
  );
};

export default PokemonOptions;
