import React, { Component } from 'react';
import css from '../styles.css';

const ChooseMoves = (props) => {
  return (
    <div className={css.moveList}>
      <br />
      <div style={{display: 'block'}}>
        <h3 style={{textAlign: 'center'}}>Choose four moves</h3>
      </div>
      <div className={css.moveList}>
        <ul>
          {props.renderMoveOptions()}
        </ul>
      </div>
    </div>
  );
};

export default ChooseMoves;
