import React from 'react';
import PropTypes from 'prop-types';
import EditableTodo from '../containers/EditableTodo';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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

export default DragDropContext(HTML5Backend)(TodoList);
