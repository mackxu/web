import * as Type from './mutations_type'

let makeAction = type => {
  return ({dispatch}, ...args) => dispatch(type, ...args)
}

export const addTodo = makeAction(Type.ADD_TODO)
export const toggleAll = makeAction(Type.TOGGLE_ALL)
export const clearCompleted = makeAction(Type.CLEAR_COMPLETED)
export const toggleTodo = makeAction(Type.TOGGLE_TODO)
export const deleteTodo = makeAction(Type.DELETE_TODO)
export const editTodo = makeAction(Type.EDIT_TODO)