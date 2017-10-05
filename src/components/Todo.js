import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';

const Todo = ({id, title, completed, onClick, onDelete}) =>
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    id: {id}, title: {title}, completed: {String(completed)}
    {
      // eslint-disable-next-line
    }<a
      href="#"
      onClick={(e) => {
        e.persist(); // https://reactjs.org/docs/events.html#event-pooling
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        onDelete()}
      }>
      Delete
    </a>
  </li>

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
}

export default Todo;
