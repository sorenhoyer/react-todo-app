import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';

const Todo = ({todo, onDelete, onClick}) => 
  <li
    onClick={() => onClick(todo.id)}
    style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}
  >
    id: {todo.id}, title: {todo.title}, completed: {String(todo.completed)} 
    <a href="#" 
      onClick={(e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        } 
        onDelete(todo.id)}
      }>
      Delete
    </a>
  </li>

// class Todo extends Component {
//   deleteTodo(id) {
//     this.props.onDelete(id);
//   }

//   render() {
//     return <li>id: {this.props.todo.id}, title: {this.props.todo.title}, completed: {this.props.todo.completed} <a href="#" onClick={this.deleteTodo.bind(this, this.props.todo.id)}>Delete</a></li>
//   }
// }

Todo.propTypes = {
  todo: PropTypes.object,
  onDelete: PropTypes.func
}

export default Todo;
