import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo, deleteTodo, toggleEditingTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  let visibleTodos = [];

  switch(filter) {
    case 'SHOW_ACTIVE':
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
    case 'SHOW_COMPLETED':
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    case undefined:
      visibleTodos = todos;
      break;
    default:
      throw new Error('Unknown filter: ' + filter)
  }
  return visibleTodos;
}

const mapStateToProps = (state, ownProps) => {
  return { todos: getVisibleTodos(state.todos, ownProps.match.params.filter) };
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    },
    onTodoDelete: id => {
      dispatch(deleteTodo(id))
    },
    onTodoToggleEditing: id => {
      dispatch(toggleEditingTodo(id))
    }
  };
}

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList));

export default VisibleTodoList;