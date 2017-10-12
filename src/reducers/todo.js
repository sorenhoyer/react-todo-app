const todo = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_TODO': {
      state.title = action.title;
      return state;
    }
    default:
      return state;
  }
}

export default todo;