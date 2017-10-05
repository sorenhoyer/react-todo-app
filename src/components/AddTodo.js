import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({dispatch}) => {
  let input;

  return <div>
    <h3>Add Todo</h3>
    <form onSubmit={(e) => 
      {
        e.preventDefault();
        if(!input.value.trim()){
          return
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }
    }>
      <label>Title</label>
      <input type="text" ref={title => { input = title }}/>
      <button type="submit">Submit</button>
    </form>
  </div>
}

AddTodo = connect()(AddTodo);

AddTodo.propTypes = {
  dispatch: PropTypes.func
};

export default AddTodo;
