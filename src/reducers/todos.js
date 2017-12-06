export default function todos(state = [], action) {
  switch (action.type) {
    case "CHILD_ADDED":
      return [...state, action.todo];
    case "CHILD_REMOVED":
      return state.filter(todo => todo.key !== action.todo.key);
    case "CHILD_CHANGED":
      return state.map(todo => {
        return todo.key === action.todo.key
          ? Object.assign({}, action.todo, action.todo)
          : todo;
      });
    default:
      return state;
  }
}
