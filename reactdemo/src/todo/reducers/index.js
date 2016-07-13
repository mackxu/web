import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITYFILTER, VisibilityFilter } from '../actions'

const { SHOW_ALL } = VisibilityFilter

function visibilityFilter(state = SHOW_ALL, action) {
	console.log('reducer: visibilityFilter');
	switch(action.type) {
		case SET_VISIBILITYFILTER: return action.filter
		default: return state
	}
}

function todos(state = [], action) {
	console.log('reducer: todos');
	switch(action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false,
				}
			];
		case COMPLETE_TODO:
			return [
				...state.slice(0, action.index),
				Object.assign({}, state[action.index], { completed: true }),
				...state.slice(action.index + 1)
			];
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	visibilityFilter,
	todos
});
export default rootReducer;