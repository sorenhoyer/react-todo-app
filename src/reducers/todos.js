const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false,
          isEditing: false
        }
      ]
    case 'DELETE_TODO': 
      return state.filter(todo => todo.id !== action.id );
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
        ? {...todo, completed: !todo.completed }
        : todo
      )
    case 'IS_EDITING_TODO': {
      return state.map(todo => 
        todo.id === action.id 
        ? { ...todo, isEditing: !todo.isEditing } 
        : todo
      );
    }
    case 'UPDATE_TODO': {
      return state.map(todo => {
        const newObj = { ...todo };
        if (newObj.id === action.id) {
          newObj.title = action.title;
        }
        return newObj;
      });
    }
    default:
      return state;
  }
}

export default todos