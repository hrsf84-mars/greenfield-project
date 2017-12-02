import React, { Component } from 'react';
import css from '../styles.css';
import TeamList from './TeamList';
import PokemonOptions from './PokemonOptions';
import ActiveChoice from './ActiveChoice';

const Team = (props) => {
  return (
    <div className={css.teamContainer}>
      <h1>Create a Team</h1>
      <div>
        <div className={css.teamCol}>
          <PokemonOptions
            options={props.pokemonOptions}
            handleSetActive={props.handleSetActive}
            handleAddPokemon={props.handleAddPokemon}
            renderOptions={props.renderOptions}
            teamCount={props.teamCount}
          />
          <TeamList pokemon={props.pokemon} handleConfirm={props.handleConfirm} />
        </div>
        <div className={css.teamCol}>
          <ActiveChoice
            choice={props.choice}
            renderActive={props.renderActive}
            renderEmpty={props.renderEmpty}
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
