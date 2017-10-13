// import uuid from 'uuid';

let nextTodoId = 0;

export const addTodo = title => {
  // uuid.v4()
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    title
  }
}

export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    id
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const toggleEditingTodo = id => {
  return {
    type: 'IS_EDITING_TODO',
    id
  }
}

export const updateTodo = (id, title) => {
  return {
    type: 'UPDATE_TODO',
    id,
    title
  }
}

export const moveTodo = (dragIndex, hoverIndex) => {
  return {
    type: 'MOVE_TODO',
    dragIndex,
    hoverIndex
  }
}


