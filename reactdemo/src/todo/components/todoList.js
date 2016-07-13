'use strict';

import React, { Component, PropTypes } from 'react';
import Todo from './todo';

class TodoList extends Component {
	render() {
		let { todos, onTodoClick } = this.props;
		return (
			<ul>
				{
					todos.map((todo, index) =>
						<Todo
							{...todo}
							onClick={onTodoClick.bind(this, index)}
							key={index}
						/>
					)
				}
			</ul>
		);
	}
}

export default TodoList;