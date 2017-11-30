import React, { Component } from 'react';
import css from '../styles.css';
import TeamList from './TeamList';
import PokemonOptions from './PokemonOptions';

const Team = (props) => {
  return (
    <div>
      <h1>Create a Team</h1>
      <PokemonOptions options={props.pokemon} handleSetActive={props.handleSetActive} />
      <TeamList pokemon={props.pokemon} />
      <button onClick={props.handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Team;
