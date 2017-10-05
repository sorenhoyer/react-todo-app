import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
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
    default:
      visibleTodos = todos;
  }
  return {todos: visibleTodos};
  
}

const mapStateToProps = state => 
  getVisibleTodos(state.todos, state.visibilityFilter);

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    },
    onTodoDelete: id => {
      dispatch(deleteTodo(id))
    }
  };
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;