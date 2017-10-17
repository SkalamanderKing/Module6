export default function todos(state = [], action){
    switch(action.type){
      case "FETCH_ALL_TODOS":
        //Don't need to manipulate the state, just return the whole array of objects!
        return action.todos;
      case "ADD_TODO":
        return [...state, action.todo];
      case "REMOVE_TODO":
        return state.filter(todo => todo.key !== action.todo.key)
      case "TOGGLE_COMPLETED":
        return state.map(todo => {
          return todo.key === action.todo.key 
            ? Object.assign({}, action.todo, { completed: action.todo.completed })
            : todo
        })
      case "EDIT_TODO":
        return state.map(todo => {
          return todo.id === action.todo.key
              ? Object.assign({}, action.todo)
              : todo
        })
      default:
        return state;
    }
  }