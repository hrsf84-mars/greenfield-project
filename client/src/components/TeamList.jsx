import React, { Component } from 'react';
import css from '../styles.css';

const TeamList = (props) => {
  return (
    <div>
      {props.pokemon.map((pokemon) =>
        return (
          <div>
            {pokemon.name}
          </div>
        );
      )}
    </div>
  );
};

export default TeamList;
