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
        <table>
          <tbody>
            <tr>
              <th>Select</th>
              <th>Move Name</th>
              <th>Power</th>
              <th>Type</th>
            </tr>
            {props.renderMoveOptions()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChooseMoves;
