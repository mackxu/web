
// action 类型
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// 其它常量
export const VisibilityFilter = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
};

// 返回action对象
// 在容器组件dispatch一般会接收
export function addTodo(text) {
	return { type: ADD_TODO, text };
}

export function completeTodo(index) {
	return { type: COMPLETE_TODO, index };
}

export function setVisibilityFilter(filter) {
	return { type: SET_VISIBILITY_FILTER, filter };
}