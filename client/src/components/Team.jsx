import React, { Component } from 'react';
import css from '../styles.css';
import TeamList from './TeamList';
import PokemonOptions from './PokemonOptions';
import ActiveChoice from './ActiveChoice';

const Team = (props) => {
  return (
    <div>
      <h1>Create a Team</h1>
      <PokemonOptions
        options={props.pokemonOptions}
        handleSetActive={props.handleSetActive}
        handleAddPokemon={props.handleAddPokemon}
      />
      <TeamList pokemon={props.pokemon} />
      <ActiveChoice
        choice={props.choice}
        renderActive={props.renderActive}
        renderEmpty={props.renderEmpty}
      />
      <button onClick={props.handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Team;
