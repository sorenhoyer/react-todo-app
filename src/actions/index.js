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


