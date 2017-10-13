import { connect } from 'react-redux';
import Todo from '../components/Todo';
import { updateTodo, moveTodo } from '../actions';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'

/**
 * Implements the drag source contract
 */
const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

/**
 * Specifies the props to inject into your component
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    //console.log(props) // the item you hover over and drop onto
    //console.log(monitor.getItem()) // the item you drag
    //console.log(component)
    
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle boudaries on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    /**
     * Only perform the move when the mouse has crossed half of the items height
     * When dragging downwards, only move when the cursor is below 50%
     * When draging upwards, only move when the cursor is above 50%
     */

    // Dragging downwards
    if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Perform the action
    props.onMoveTodo(dragIndex, hoverIndex);

    /**
     * Note: We're mutating the monitor item here.
     * Generally it's better to avoid mutations,
     * but it's good here for the sake of performance
     * to avoid expensive index searches
     */
    monitor.getItem().index = hoverIndex;
  }
}

function collectDrop(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

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

let EditableTodo = DragSource('todo', todoSource, collect)(Todo);
EditableTodo = DropTarget('todo', todoTarget, collectDrop)(EditableTodo);
EditableTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTodo);

export default EditableTodo;