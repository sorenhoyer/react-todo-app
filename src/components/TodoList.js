import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({todos, visibleTodos, onDelete, onClick}) => {
  let todoItems = visibleTodos.map(todo => {
    return <Todo key={todo.id} todo={todo} onDelete={onDelete} onClick={onClick}/>
  });

  return <ul>{todoItems}</ul>
}

// class Todos extends Component {
//   deleteTodo(id) {
//     this.props.onDelete(id);
//   }

//   render() {
//     let todoItems = this.props.todos.map(todo => {
//       return <Todo key={todo.id} todo={todo} onDelete={this.deleteTodo.bind(this)}/>
//     });

//     return <ul>{todoItems}</ul>
//   }
// }

TodoList.propTypes = {
  todos: PropTypes.array,
  onDelete: PropTypes.func
}

export default TodoList;
