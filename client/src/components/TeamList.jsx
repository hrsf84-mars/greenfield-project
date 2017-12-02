import React, { Component } from 'react';
import css from '../styles.css';

const TeamList = (props) => {
  return (
    <div className={css.listPokemon}>
      <h3 >Selected Team</h3>
      <br />
      <div className={css.teamList} >
        {props.pokemon.map((pokemon) => {
          return (
            <div style={{ display: 'inline-block', width: '150px' }} key={pokemon.name}>
              <img src={pokemon.sprites.front_default} alt="" />
              <h5 style={{ marginBottom: '0px', marginTop: '2px' }}>{pokemon.name}</h5>
              <h6 style={{ marginBottom: '0px' }}>{pokemon.health} / {pokemon.initialHealth}</h6>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <button style={{ display: 'block' }} onClick={props.handleConfirm} className={css.gameButton}>
        Confirm Team
      </button>
    </div>
  );
};

export default TeamList;
