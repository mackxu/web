'use strict';

import React, { Component, PropTypes } from 'react';

class Counter extends Component {

	static propTypes = {
		value: PropTypes.number.isRequired,
		onIncrement: PropTypes.func.isRequired,
		onDecrement: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	incrementIfOdd = () => {
		if (this.props.value % 2 !== 0) {
			this.props.onIncrement();
		}
	};

	incrementAsync = () => {
		this.timerId = setTimeout(this.props.onIncrement, 1000);
	};

	render() {
		const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked: {value} times2
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    );
	}
}

export default Counter;