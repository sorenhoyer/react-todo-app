import React/*, { Component }*/ from 'react';
import PropTypes from 'prop-types';

let Todo = ({id, title, isEditing, completed, onClickTodo, onDeleteTodo, onToggleEditingTodo, onUpdateTodo, isDragging, connectDragSource, connectDropTarget, index}) => {
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
    {
      // eslint-disable-next-line
    }<a
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

export default Todo;
