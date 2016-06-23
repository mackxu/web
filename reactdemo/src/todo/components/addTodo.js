'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class AddTodo extends Component {
	handleClick = e => {
		const inputNode = findDOMNode(this.refs.input);
		const text = inputNode.value.trim();
		this.props.onAddClick(text);
		inputNode.value = '';
	};
	render() {
		return (
			<div>
				<input type="text" ref="input" />
				<button onClick={e => this.handleClick(e) }>
					Add
				</button>
			</div>
		);
	}
}

export default AddTodo;