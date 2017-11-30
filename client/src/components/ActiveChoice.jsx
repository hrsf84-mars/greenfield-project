import React, { Component } from 'react';
import css from '../styles.css';


const ActiveChoice = (props) => {
  return (props.choice ? props.renderActive() : props.renderEmpty());
};

export default ActiveChoice;
