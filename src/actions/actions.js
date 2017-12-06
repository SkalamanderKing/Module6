import firebase from "../firebase";

export function addTodo(todo) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`todos`)
      .push(todo)
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function signOut() {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(window.location.reload())
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function toggleCompleted(user) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`users/${user.key}/isAdmin`)
      .set(!user.isAdmin)
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function editTodo(todo) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`todos/${todo.key}`)
      .set({
        text: todo.text,
        postNo: todo.postNo,
        createdBy: todo.createdBy
      })
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function addUserListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref("users")
      .on("child_added", user => {
        const userValue = { ...user.val(), key: user.key };
        dispatch({ type: "CHILD_ADDED_USER", user: userValue });
      });
  };
}

export function addTodoListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`todos`)
      .on("child_added", snapshot => {
        const todo = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_ADDED", todo });
      });
  };
}

export function changeTodoListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`todos`)
      .on("child_changed", snapshot => {
        const todo = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_CHANGED", todo });
      });
  };
}

export function changeUserListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`users`)
      .on("child_changed", snapshot => {
        const user = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "USER_CHANGED", user });
      });
  };
}

export function removeTodo(todo) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`todos/${todo.key}`)
      .remove()
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function removeUsers(user) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`users/${user.key}`)
      .remove()
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function removeTodoListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`todos`)
      .on("child_removed", snapshot => {
        const todo = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_REMOVED", todo });
      });
  };
}
export function removeUserListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`users`)
      .on("child_removed", snapshot => {
        const user = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "USER_REMOVED", user });
      });
  };
}

export function userChanged() {
  return function(dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .once("value")
          .then(user => {
            dispatch({ type: "SIGN_IN", user: user.val() });
          });
      } else {
        dispatch({ type: "SIGN_OUT", user: "" });
      }
    });
  };
}

export function userData() {
  return function(dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var id = user.uid;
        var firebaseRef = firebase.database().ref(`/users/` + id + `/isAdmin`);
        firebaseRef.once("value").then(dataSnapshot => {
          var obj = {
            uid: user.uid,
            email: user.email,
            isadmin: dataSnapshot.val()
          };
          dispatch({ type: "USER_SIGN_IN", user: obj });
        });
      } else {
        dispatch({ type: "USER_SIGN_OUT", user: "" });
      }
    });
  };
}

export function isAdmin() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(users => {
      if (users) {
        var id = users.uid;
        var firebaseRef = firebase.database().ref(`/users/` + id + `/isAdmin`);
        firebaseRef.once("value").then(dataSnapshot => {
          dispatch({ type: "IS_ADMIN", isadmin: dataSnapshot.val() });
        });
      } else dispatch({ type: "IS_NOT_ADMIN", isadmin: null });
    });
  };
}