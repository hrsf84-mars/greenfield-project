import React, { Component } from 'react';
import css from '../styles.css';
import TeamList from './TeamList';

const Team = (props) => {
  return (
    <div>
      <h1>Your Team</h1>
      <TeamList pokemon={props.pokemon} />
      <button onClick={props.handleConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default Team;
