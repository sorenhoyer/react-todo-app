import { connect } from 'react-redux';
import Todo from '../components/Todo';
import { updateTodo, moveTodo } from '../actions';

const mapStateToProps = (state, ownProps) => {
  let todo = state.todos.find(todo => todo.id === ownProps.id);
  return { todo: todo }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTodo: (id, title) => {
      dispatch(updateTodo(id, title))
    },
    onMoveTodo: (dragIndex, hoverIndex) => {
      dispatch(moveTodo(dragIndex, hoverIndex));
    }
  };
};

const EditableTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);

export default EditableTodo;