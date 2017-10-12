import { connect } from 'react-redux';
import Todo from '../components/Todo';
import { updateTodo } from '../actions';

const mapStateToProps = (state, ownProps) => {
  let todo = state.todos.find(todo => todo.id === ownProps.id);
  return { todo: todo }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTodo: (id, title) => {
      dispatch(updateTodo(id, title))
    }
  };
};

const EditableTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

export default EditableTodo;