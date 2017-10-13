import React from 'react';
import PropTypes from 'prop-types';
import EditableTodo from '../containers/EditableTodo';

const TodoList = ({todos, onTodoClick, onTodoDelete, onTodoToggleEditing}) => {
  let todoItems = [];
  todoItems = todos.map(todo => {
    return <EditableTodo 
      key={todo.id} 
      {...todo} 
      onDeleteTodo={() => onTodoDelete(todo.id)} 
      onClickTodo={() => onTodoClick(todo.id)} 
      onToggleEditingTodo={() => onTodoToggleEditing(todo.id)}
  />
  });

  return <ul>{todoItems}</ul>
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}

export default TodoList;
