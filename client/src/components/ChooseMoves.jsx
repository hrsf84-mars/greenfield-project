import React, { Component } from 'react';
import css from '../styles.css';

const ChooseMoves = (props) => {
  return (
    <div className={css.listPokemon}>
      <h3>zChoose four moves</h3>
      <br />
      <div className={css.moveList}>
      </div>
    </div>
  );
};
        // {props.teamCount < 3 ? props.renderOptions() : null}

export default ChooseMoves;
