import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';
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

let Todo = ({id, title, isEditing, completed, onClickTodo, onDeleteTodo, onToggleEditingTodo, onUpdateTodo, onMoveTodo, isDragging, connectDragSource, connectDropTarget, index}) => {
  let input = title;
  let titleVar;
  let btnSubmit;

  //if(input !== title) {
    btnSubmit = <button 
      type="submit"
      onClick={e=>{
        e.persist();
        e.cancelBubble = true;
        if(e.stopPropagation())
          e.stopPropagation();
      }}
    >
    Save {input}
    </button>
  //}

  if(isEditing) {
    titleVar = <form 
      onSubmit={e => {
        e.preventDefault();
        if(!input.value.trim()){
          return
        }
        onUpdateTodo(id, input.value);
        onToggleEditingTodo();
      }}
    >
      <label>{input}</label><input 
        type="text" 
        defaultValue={title} 
        ref={titleInput => {
          input = titleInput}
        }
        onClick={e=>{
          e.persist();
          e.cancelBubble = true;
          if(e.stopPropagation())
            e.stopPropagation();
        }}
      />
      {btnSubmit}
    </form>
  }
  return connectDragSource(connectDropTarget(<li
    onClick={onClickTodo}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      opacity: isDragging ? 0.5 : 1
    }}
  >
    id: {id}, title: {titleVar ? titleVar : title}, completed: {String(completed)}, isEditing: {String(isEditing)}
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
        onDeleteTodo()}
      }>
      Delete
    </a>
    <a
      href="#"
      onClick={e => {
        e.persist();
        e.cancelBubble = true;
        if(e.stopPropagation())
          e.stopPropagation();
        onToggleEditingTodo();
      }}
    > Edit
    </a>
  </li>))
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClickTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func
}

Todo = DragSource('todo', todoSource, collect)(Todo);
Todo = DropTarget('todo', todoTarget, collectDrop)(Todo);
export default Todo;
