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
          />
          <TeamList pokemon={props.pokemon} />
        </div>
        <div className={css.teamCol}>
          <ActiveChoice
            choice={props.choice}
            renderActive={props.renderActive}
            renderEmpty={props.renderEmpty}
          />
        </div>
      </div>
      <br />
      <br />
      <button style={{ display: 'block' }} onClick={props.handleConfirm} className={css.gameButton}>
        Confirm Team
      </button>
    </div>
  );
};

export default Team;
