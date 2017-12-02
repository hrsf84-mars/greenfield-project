import React from 'react';
import css from '../styles.css';

function Logo(props) {
  const renderStatus = () => {
    // if (props.opponent) {
    //   if (props.isWaiting) {
    //     return 'Waiting... Your opponent has not selected a move yet';
    //   }
    //   return 'Select a Move';
    // }
    // return null;
    return props.status;
  };

  return (
    <div className={css.logoContainer}>
      <h2>
        <span>
          <img
            src="https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358"
            style={{ maxWidth: '50px' }}
            alt="pokeball"
          />
        </span>Chattermon
      </h2>
      <h4>{props.name} v. {props.opponent ? props.opponent.name : '???' }</h4>
      <h4>{renderStatus()}</h4>
      <h4 style={{ color: 'red' }}>{props.message}</h4>
    </div>
  );
}

export default Logo;
