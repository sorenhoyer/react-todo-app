import { combineReducers } from 'redux';
import todos from './todos';
// import todo from './todo';

const todoApp = combineReducers({
  todos,
  // todo
})

export default todoApp;