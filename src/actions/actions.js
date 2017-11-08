
import firebase from '../firebase';
//import * as admin from "firebase-admin";
//var admin = require("firebase-admin");

/*
 * Notice that the actual actions in here doesn't dispatch any actions 
 * to the reducers. This is because we have set up listener further down
 * If we would dispatch both in the action and the listener we would 
 * get double updates. We only need the listeners to make the change
 */

export function addTodo(todo){
  return function(dispatch){
    firebase.database().ref(`todos`).push(todo)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}



export function toggleCompleted(user){
  return function (dispatch){
    // We can set just a part of an object, like the completed property on
    // just one item. Go to the path of the resource and change the value
    firebase.database().ref(`users/${user.key}/isAdmin`).set(!user.isAdmin)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function editTodo(todo){
  return function (dispatch){
    //Be advised that '.set()' REPLACES THE WHOLE OBJECT, it 
    //doesn't just update the values that needs to be updated
    firebase.database().ref(`todos/${todo.key}`).set({
      text: todo.text,
      //completed: todo.completed,
      //number:todo.number,
      createdBy:todo.createdBy
    })
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function addUserListener(){
  return function(dispatch){
    return firebase.database().ref("users").on("child_added", user =>{
      const userValue = {...user.val(), key: user.key };
      dispatch({ type: "CHILD_ADDED_USER", user: userValue })
    })
  }
}
/*
 * Three event listeners, one for listening when we add a todo, 'child_added',
 * one when we update any value in a child: 'child_changed' and one when 
 * a todo is removed from 'todos: 'child_removed'
 */

export function addTodoListener(){
  return function(dispatch){
    return firebase.database().ref(`todos`).on('child_added', snapshot =>{
      /* snapshot is the item that is being adde, same as before, grab the
       * value, then add the key. After we have created this, dispatch!
       * Same logic in all the listeners
       */
      const todo = {...snapshot.val(), key: snapshot.key };
      dispatch({ type: "CHILD_ADDED", todo })
    })
  }
}

export function changeTodoListener(){
  return function(dispatch){
    return firebase.database().ref(`todos`).on('child_changed', snapshot =>{
      const todo = {...snapshot.val(), key: snapshot.key };
      dispatch({ type: "CHILD_CHANGED", todo })
    })
  }
}

export function changeUserListener(){
  return function(dispatch){
    return firebase.database().ref(`users`).on('child_changed', snapshot =>{
      const user = {...snapshot.val(), key: snapshot.key };
      dispatch({ type: "USER_CHANGED", user })
    })
  }
}

export function removeTodo(todo){
  return function (dispatch){
    firebase.database().ref(`todos/${todo.key}`).remove()
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}
export function removeUsers(user){
  return function (dispatch){
    firebase.database().ref(`users/${user.key}`).remove()
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function removeTodoListener(){
  return function(dispatch){
    return firebase.database().ref(`todos`).on('child_removed', snapshot =>{
      const todo = {...snapshot.val(), key: snapshot.key };
      dispatch({ type: "CHILD_REMOVED", todo })
    })
  }
}
export function removeUserListener(){
  return function(dispatch){
    return firebase.database().ref(`users`).on('child_removed', snapshot =>{
      const user = {...snapshot.val(), key: snapshot.key };
      dispatch({ type: "USER_REMOVED", user })
    })
  }
}
export function userChanged() {
  return function(dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).once('value')
        .then(user=> {
          dispatch({ type: "SIGN_IN", user})
          //console.log(user.val().text);
        })
      } else {
        dispatch({ type: "SIGN_OUT", user: '' });
      }
    });
  };
}
// export function getIdOfUser(users){
//   return function (dispatch){
//     firebase.auth().onAuthStateChanged((users) => {
//       if (users) {
//         this.setState({ userUid: users.uid, email:users.email});
//       }
//     });

//   }
// }
// import firebase from "../firebase";

// export function addTodo(todo) {
//   return function(dispatch) {
//     firebase
//       .database()
//       .ref(`todos`)
//       .push(todo)
//       .catch(error => {
//         //Should use multiple errors! But I am too lazy :) You do it!
//         dispatch({ type: "FETCH_ERROR", error: error.message });
//       });
//   };
// }

// export function removeTodo(todo) {
//   return function(dispatch) {
//     //Get the key, the place of the object, and call remove, you must have
//     //the key to remove an item, we always use the path to the item
//     firebase
//       .database()
//       .ref(`todos/${todo.key}`)
//       .remove();
//   };
// }

// export function toggleCompleted(todo) {
//   return function(dispatch) {
//     // We can set just a part of an object, like the completed property on
//     // just one item. Go to the path of the resource and change the value
//     firebase
//       .database()
//       .ref(`todos/${todo.key}/completed`)
//       .set(!todo.completed)
//       .catch(error => {
//         dispatch({ type: "FETCH_ERROR", error: error.message });
//       });
//   };
// }

// export function editTodo(todo) {
//   return function(dispatch) {
//     //Be advised that '.set()' REPLACES THE WHOLE OBJECT, it
//     //doesn't just update the values that needs to be updated
//     firebase
//       .database()
//       .ref(`todos/${todo.key}`)
//       .set({
//         text: todo.text,
//         completed: todo.completed
//       })
//       .catch(error => {
//         dispatch({ type: "FETCH_ERROR", error: error.message });
//       });
//   };
// }

