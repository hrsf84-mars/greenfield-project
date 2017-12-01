import React from 'react';
import css from '../styles.css';

const Logo = (props) => {
  const renderTurn = () => {
    if (props.opponent) {
      if (props.isActive) {
        return 'Your turn'
      } else {
        return `${props.opponent.name}'s turn`; 
      }
    } else {
      return null;
    }
  }
  return (
    <div className={css.logoContainer}>
      <h2><span><img src={'https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358'} style={{maxWidth: '50px'}} /></span>Chattermon</h2>
      <h4>{props.name} v. {props.opponent ? props.opponent.name : '???' }</h4>
      <h4>{renderTurn()}</h4>
      <h4>{props.message}</h4>
    </div>
  )
}

export default Logo; 