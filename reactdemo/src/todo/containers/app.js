'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilter } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/todoList'
import Footer from '../components/footer'

class App extends Component {

	static propTypes = {
		visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		  text:PropTypes.string.isRequired,
		  completed: PropTypes.bool.isRequired,
		}).isRequired).isRequired,
		visibilityFilter: React.PropTypes.oneOf([
			'SHOW_ALL',
			'SHOW_COMPLETED',
			'SHOW_ACTIVE'
		]).isRequired,
	};

	render() {
		// Injected by connect() call
		// dispatch接收action参数，传递给reducer函数
		const { dispatch, visibleTodos, visibilityFilter } = this.props;
		return (
			<div>
				<AddTodo onAddClick={ text => dispatch(addTodo(text)) } />
				<TodoList todos={visibleTodos} onTodoClick={index => dispatch(completeTodo(index))} />
				<Footer
					filter={visibilityFilter}
					onFilterChange={ nextFilter => dispatch(setVisibilityFilter(nextFilter)) }
					/>
			</div>
		);
	}
}

/**
 * 根据filter筛选todos
 * @param  {[type]} todos  [description]
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
function selectTodos(todos, filter) {
	switch(filter) {
		case VisibilityFilter.SHOW_ALL: return todos
		case VisibilityFilter.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed)
		case VisibilityFilter.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed)
	}
}

// which props do we want to inject
function select(state){
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	}
}

// 包装component, 注入dispatch和state到其默认的connent(select)(App)中
export default connect(select)(App);