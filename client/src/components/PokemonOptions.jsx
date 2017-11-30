import React, { Component } from 'react';
import css from '../styles.css';

const PokemonOptions = (props) => {
  return (
    <div>
      <h3>Choose a pokemon</h3>
      {props.options.map((pokemon) => {
        return (
          <div onClick={() => props.handleSetActive(pokemon)}>
            <img src={pokemon.sprites.front_default} alt="" />
            <h5 style={{ marginBottom: '0px', marginTop: '2px' }}>{pokemon.name}</h5>
            <h6 style={{ marginBottom: '0px' }}>{pokemon.health} / {pokemon.initialHealth}</h6>
          </div>
        );
      })}
      <button onClick={props.handleAddPokemon}>Choose Pokemon</button>
    </div>
  );
};

export default PokemonOptions;
