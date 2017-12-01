import React, { Component } from 'react';
import css from '../styles.css';

const PokemonCard = (props) => {
  return (
    <div>
      <img src={props.sprites.front_default} alt="" />
      <h5 style={{marginBottom: '0px', marginTop: '2px'}}>{props.name}</h5>
      <h6 style={{marginBottom: '0px'}}>{props.health} / {props.initialHealth}</h6>
      <button onClick={props.clickHandler}> choose {props.name} </button>
    </div>
  )
}

export default PokemonCard;