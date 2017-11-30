import React, { Component } from 'react';
import css from '../styles.css';

const TeamList = (props) => {
  return (
    <div>
      {props.pokemon.map((pokemon) => {
        return (
          <div>
            <img src={pokemon.sprites.front_default} alt="" />
            <h5 style={{ marginBottom: '0px', marginTop: '2px' }}>{pokemon.name}</h5>
            <h6 style={{ marginBottom: '0px' }}>{pokemon.health} / {pokemon.initialHealth}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default TeamList;
