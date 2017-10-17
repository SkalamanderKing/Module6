import firebase from "../firebase";

export function addTodo(todo) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`todos`)
      .push(todo)
      .catch(error => {
        //Should use multiple errors! But I am too lazy :) You do it!
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function removeTodo(todo) {
  return function(dispatch) {
    //Get the key, the place of the object, and call remove, you must have
    //the key to remove an item, we always use the path to the item
    firebase
      .database()
      .ref(`todos/${todo.key}`)
      .remove();
  };
}

export function toggleCompleted(todo) {
  return function(dispatch) {
    // We can set just a part of an object, like the completed property on
    // just one item. Go to the path of the resource and change the value
    firebase
      .database()
      .ref(`todos/${todo.key}/completed`)
      .set(!todo.completed)
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function editTodo(todo) {
  return function(dispatch) {
    //Be advised that '.set()' REPLACES THE WHOLE OBJECT, it
    //doesn't just update the values that needs to be updated
    firebase
      .database()
      .ref(`todos/${todo.key}`)
      .set({
        text: todo.text,
        completed: todo.completed
      })
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function fetchTodos() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`todos`)
      .on("value", todos => {
        /* With once('value') we get an object of objects,  
         * to create an array of this it is easiest to push ever value */
        let tempList = [];
        todos.forEach(child => {
          /* Take every value, spread the values, But we also need the ID, the key
           * so we add a key-property and add the key from the object */
          tempList.push({ ...child.val(), key: child.key });
        });
        //When we are done creating the array, dispatch to state
        dispatch({ type: "FETCH_ALL_TODOS", todos: tempList });
      });
  };
}

export function userChanged() {
  return function(dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).once('value')
        .then(user=> {
          dispatch({ type: "SIGN_IN", user: user })
        })
      } else {
        dispatch({ type: "SIGN_OUT", user: '' });
      }
    });
  };
}
