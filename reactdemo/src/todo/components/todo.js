'use strict';

import React, { Component, PropTypes } from 'react';

class Todo extends Component {
	render() {
		const { onClick, completed, text } = this.props;

		return (
			<li
				onClick={onClick}
				style={{
					textDecoration: completed ? 'line-through' : 'none',
					cursor: completed ? 'default' : 'pointer',
				}}
			>{text}</li>
		);
	}
}

export default Todo;