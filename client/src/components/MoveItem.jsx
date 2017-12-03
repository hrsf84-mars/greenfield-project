import React, { Component } from 'react';
import css from '../styles.css';

export default class MoveItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  handleCheckBoxChange() {
    const { moves } = this.props.activeChoice;
    if (moves.length < 4) {
      // check to see if checkbox is being checked or unchecked
      if (!this.state.isChecked) {
        // if it's being checked, add move to the array
        moves.push(this.props.move);
      } else {
        // if it's being unchecked, remove it from the array
        this.props.activeChoice.moves = moves.filter(existingMove => existingMove.name !== this.props.move.name);
      }
    this.props.handleMoveSelect(this.props.activeChoice);
    }
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <tr key={this.props.move.name} className={css.moveItem}>
        <td>
          <input
            type="checkbox"
            onChange={this.handleCheckBoxChange.bind(this)}
            checked={this.state.isChecked}
          />
        </td>
        <td>{this.props.move.name}</td>
        <td>{this.props.move.power}</td>
        <td>{this.props.move.type}</td>
      </tr>
    );
  }
};
