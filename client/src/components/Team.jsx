import React, { Component } from 'react';
import css from '../styles.css';

const Team = (props) => {
  return (
    <div>
      <h1>Your Team</h1>
      <button onClick={props.handleConfirm}>
        Confirm
      </button>
    </div>
  );
}

export default Team; 