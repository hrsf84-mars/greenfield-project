import React from 'react';
import css from '../styles.css';

function Logo(props) {
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
      <h4>{props.status}</h4>
      <h4 style={{ color: 'red' }}>{props.message}</h4>
    </div>
  );
}

export default Logo;
