import firebase from "../firebase";

export function addPost(post) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`posts`)
      .push(post)
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
  };
}

export function signIn(loginInfo) {
  return function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .catch(error => {
        dispatch({ type: "FETCH_ERROR", error: error.message });
      });
    isAdmin();
  };
}

export function register(newOne) {
  return function(dispatch) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newOne.email, newOne.password)
      .then(user => {
        const newUser = {
          email: user.email,
          isAdmin: false
        };
        if (user !== null)
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set(newUser)
            .catch(error => {
              dispatch({ type: "FETCH_ERROR", error: error.message });
            });
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

export function editPost(post) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`posts/${post.key}`)
      .set({
        text: post.text,
        postNo: post.postNo,
        createdBy: post.createdBy
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

export function addPostListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`posts`)
      .on("child_added", snapshot => {
        const post = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_ADDED", post });
      });
  };
}

export function changePostListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`posts`)
      .on("child_changed", snapshot => {
        const post = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_CHANGED", post });
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

export function removePost(post) {
  return function(dispatch) {
    firebase
      .database()
      .ref(`posts/${post.key}`)
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

export function removePostListener() {
  return function(dispatch) {
    return firebase
      .database()
      .ref(`posts`)
      .on("child_removed", snapshot => {
        const post = { ...snapshot.val(), key: snapshot.key };
        dispatch({ type: "CHILD_REMOVED", post });
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
      } else
        dispatch({ type: "IS_NOT_ADMIN", isadmin: null }).catch(error => {
          dispatch({ type: "FETCH_ERROR", error: error.message });
        });
    });
  };
}
