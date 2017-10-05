import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick, onTodoDelete}) => {
  let todoItems = [];
  
  todoItems = todos.map(todo => {
    return <Todo key={todo.id} {...todo} onDelete={() => onTodoDelete(todo.id)} onClick={() => onTodoClick(todo.id)}/>
  });

  return <ul>{todoItems}</ul>
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}

export default TodoList;
