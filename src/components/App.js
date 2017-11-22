import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
import "../App.css";
import Jumbotron from "./Jumbotron";
import Footer from "./Footer";
import Container from "./Container";
import Navbar from "./Navbar";
import firebase from "../firebase";
import Input from "./Input";
//import Modal from "./Modal";
import ToggleCheckbox from "./ToggleCheckbox";
import Uservalue from "./Uservalue";
/* Good news, the logic in the component is basically the same!
 * It is the actions that need updating! We are creating our own API in our actions :)
 */

class App extends Component {
  state = {
    text: "",
    email: "",
    password: "",
    userUid: undefined,
    isAdmin: "",
    // user:undefined,
    loggedIn: undefined,
    //number: 1
    value: "",
    signInOrUp: true,
    
  };

  componentDidMount() {
    //We want to fetch them all! Like with the movies
    //this.props.fetchTodos();
    // this.props.fetchUser();
    //One listener for every item added
    this.props.addTodoListener();
    this.props.addUserListener();
    //One listener for every change in ever item, listens to ANY change
    this.props.changeTodoListener();
    //Listens to which item is being removed

    this.props.userChanged();
    this.getIdOfUser();
    this.props.changeUserListener();
    this.props.removeTodoListener();
    this.props.removeUserListener();
  }

  add = e => {
    //console.log(e.target.id);
    //No need for the random ID, just send these values
    this.props.addTodo({
      text: this.state.value,
      // completed: false,
      postNo: e.target.id,
      createdBy: this.state.userUid
    });
    this.setState({ value: "" });
    // this.refs.someName.value = '';
  };

  getIdOfUser = () => {
    firebase.auth().onAuthStateChanged(users => {
      if (users) {
        this.setState({ userUid: users.uid, email: users.email });
        this.getValueofUser(users.uid);
      }
    });
  };

  getValueofUser = id => {
    if (id !== undefined) {
      var firebaseRef = firebase.database().ref(`/users/` + id + `/isAdmin`);
      firebaseRef.once("value").then(dataSnapshot => {
        var t = dataSnapshot.val();
        this.setState({
          isAdmin: t
        });
      });
    }
  };

  /*
  getUserUid = () => {
    var userID=undefined;

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase
            .database()
            .ref(`users/${user.uid}/posts`)
          .on('value', snapshot => {
           // this.setState({userUid: snapshot.val()});
           userID=snapshot.val();
          });
            console.log(user.uid);
           
        } else {
          console.log("hej då");
        }
        
      });
      this.setState({ userUid: userID,  });
      console.log(userID);
    };
*/

  remove = todo => {
    this.props.removeTodo(todo);
  };
  removeUser = user => {
    this.props.removeUsers(user);
    //(alert("hej"));
  };

  getAllusers = user => {};

  edit = todo => {
    const editedTodo = Object.assign({}, todo, { text: this.state.value });
    this.props.editTodo(editedTodo);
  };

  toggleCompleted = user => {
    this.props.toggleCompleted(user);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  register = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const newUser = {
          email: user.email,
          isAdmin: false,
          posts: ""
        };
        if (user !== null)
          firebase
            .database()
            .ref(`users/${user.uid}`)
            .set(newUser)
            .then(this.setState({ loggedIn: true }));
      });
  };

  signIn = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.setState({ loggedIn: true }));
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(window.location.reload());
  };

  setOption = (event) => {

    if(this.state.signInOrUp)
    this.setState({ signInOrUp: false })
    else
    this.setState({ signInOrUp: true })
  }

  render() {
    
    const userList = this.props.user.map((user, k) => {
      if (this.state.isAdmin && user !== "") {
        return <div key={k}>
            <Uservalue value={user.email} title="Remove" onClick={() => this.removeUser(user)} />
            <Uservalue value={user.isAdmin} title="Admin" onClick={() => this.toggleCompleted(user)} />
          </div>;
      } else return <div key={k}> </div>;
    });

    
    // const userList = this.props.user.map((user, k) => {
    //   if (this.state.isAdmin && user !== "") {
    //     return (
    //       <div key={k}>
    //         {/*<div key={k}> {user.email} */}
    //         <UserToRemove {...user} 
    //         onClick={() => this.removeUser(user)}  />
      
    //         <UserIsAdmin  value={user.isAdmin}
    //         onClick={() => this.toggleCompleted(user)}  
            
    //         />
    //       </div>
    //     );
    //   } else return <div key={k}> </div>;
    // });
    // const userList = this.props.user.map((user, k) => {
    //   if (this.state.isAdmin && user !== "") {
    //     return (
    //       <div key={k}>
    //         {user.email}
       
    //         {/* {console.log(user)} */}
    //         <button className="button2" onClick={() => this.removeUser(user)}>
    //           Remove User
    //         </button>
    //         <button
    //           className="button"
    //           onClick={() => this.toggleCompleted(user)}
    //         >
    //           {" "}
    //           Admin
    //         </button>{" "}
    //         {user.isAdmin.toString()}
    //       </div>
    //     );
    //   } else return <div key={k}> </div>;
    // });

    const todoList = this.props.todos.map((todo, k) => {
      // <ListItem key={todo.toString()}
      // value={todo} />
      if (
        todo.postNo === "3" &&
        (todo.createdBy === this.state.userUid || this.state.isAdmin)
      ) {
        return (
          <div key={k}>
            {todo.text}
            {/* {console.log(todo.postNo)} */}
            <button className="button" onClick={() => this.remove(todo)}>
              X
            </button>
            <button className="button" onClick={() => this.edit(todo)}>
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "3") return <div key={k}>{todo.text} </div>;
    });

    const todoList2 = this.props.todos.map((todo, k) => {
      // if(this.state.number===1)

      //  if (todo.createdBy === this.state.userUid || this.state.isAdmin)
      if (
        todo.postNo === "2" &&
        (todo.createdBy === this.state.userUid || this.state.isAdmin)
      ) {
        return (
          <div key={k}>
            {todo.text}
            {/* {console.log(todo.postNo)} */}
            <button className="button" onClick={() => this.remove(todo)}>
              X
            </button>
            <button className="button" onClick={() => this.edit(todo)}>
              {" "}
              Edit{" "}
            </button>
          </div>
        );
      } else if (todo.postNo === "2") return <div key={k}>{todo.text} </div>;
    });
    //}

    //TODO fixa inlägg 2,3 etc (kanske med nr på todos (eg inlägg)?)

    // const todoList2 = this.props.todos.map((todo, k) => {
    // //  if(this.state.number===2)
    //   if (todo.createdBy === this.state.userUid || this.state.isAdmin) {
    //     return (
    //       <div key={k}>
    //         {todo.text }

    //         <button className="button" onClick={() => this.remove(todo)}>
    //           Remove todo
    //           </button>
    //           <button className="button" onClick={() => this.edit(todo)}>
    //             {" "}
    //             Edit Todo{" "}
    //           </button>
    //       </div>
    //     );
    //   } else return <div key={k}>{todo.text} </div>;
    // });

    /*
    if (this.state.userUid !== undefined) {
      todoList2 = this.props.todos.map(
        function(todo) {
   
          if (todo.createdBy === this.state.userUid || this.state.isAdmin)
            return (
              <div key={todo.key}>
                <button className="button" onClick={() => this.remove(todo)}>
                  Remove Todo
                </button>
                <button className="button" onClick={() => this.edit(todo)}>
                  {" "}
                  Edit Todo{" "}
                </button>
              </div>
            );
          return;
        }.bind(this)
      );
    }
*/

    /*
    if (this.state.userUid !== undefined) {
      todoList3 = this.props.todos.map(
        function(todo) {
          if (todo.createdBy === this.state.userUid || this.state.isAdmin)
            return (
              <div key={todo.key}>
                <button className="button" onClick={() => this.edit(todo)}>
                  {" "}
                  Edit Todo{" "}
                </button>
              </div>
            );
          return;
        }.bind(this)
      );
    }
*/


    return <div className="App">
        {/* <Navbar></Navbar> */}

  

        {this.state.signInOrUp && !this.state.loggedIn && <form onSubmit={this.signIn}>
        <div className="form-inline">
              <Input onChange={this.onChange} value={this.state.name} />
          
              <input className="button" id="myButt" type="submit" value="Sign In" /> </div>
            </form>}

        {!this.state.signInOrUp && !this.state.loggedIn && <form onSubmit={this.register}>
        <div className="form-inline"> <Input onChange={this.onChange} value={this.state.name} />
        
              <input className="button" id="myButt2" type="submit" value="Register" /></div>
            </form>}

        {this.state.loggedIn && <p>
            {this.state.email}
            <button className="button" id="myButt3" onClick={this.signOut}>
              {" "}
              Log out{" "}
            </button>{" "}
          </p>}

          {!this.state.loggedIn && <div onClick={event => this.setOption(event)}>
            <label className="radio-button">
              {" "}
              <input type="radio" value="SignIn" defaultChecked name="signInOrUp" />
              Sign In    {" "}
            </label>
            <label className="radio-button">
              {" "}
              <input type="radio" value="Register" name="signInOrUp" />
              Register     {" "}
            </label>
          </div>}
        <Jumbotron />
        {/* <button className="button" onClick={this.getValueofUser}>
          hämta
        </button> */}
        <div>{userList}</div>

        <Container>
          <div className="row">
            <figure className="col-xs-4">
              <p className="mqtx">Birdy</p>
              <img id="bild" src={require("./birdy3D.png")} className="img-rounded" alt="Birdy2" width="384" height="384" />
            </figure>
            <main>
              <h3>Lorem! Ipsum dolor sit amet, consectetur adipiscing elit. </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Duis nisl ipsum, luctus rutrum tellus vel, mollis fringilla
                mauris. Nullam sagittis tristique arcu, vel euismod urna
                elementum ac. Fusce in tortor ac mauris elementum porttitor.
                Interdum et malesuada fames ac ante ipsum primis in
              </p>
              <form>
                <div className="form-group">
                  {" "}
                  <div className="col-xs-8">
                    <label htmlFor="comment">Comment:</label>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </Container>

        <Container>
          {this.props.error}

          <textarea placeholder="Din kommentar (logga in först!)" type="text" onChange={this.onChange} name="value" value={this.state.value} ref="someName" className="form-control" rows="3" id="comment" style={{ textAlign: "left", borderStyle: "solid", margin: "auto", border: "3px solid #73AD21", padding: "10px", backgroundColor: "lightblue" }} />
          <p />
          {this.state.loggedIn && <button type="submit" id="3" className="btn btn-success" onClick={this.add}>
              Skicka kommentar
            </button>}
          <p />
          <div className="chat" style={{ textAlign: "left", borderStyle: "solid", margin: "auto", width: "60%", border: "3px solid #73AD21", padding: "10px", backgroundColor: "lightblue" }}>
            {todoList}
          </div>
        </Container>

        <Container>
          {this.props.error}
          {/* {yyy}{" hej"} */}

          {/* <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button className="button" onClick={this.add}> Add Todo </button> */}
          <textarea placeholder="Din kommentar (logga in först!)" type="text" onChange={this.onChange} name="value" value={this.state.value} ref="someName" className="form-control" rows="3" id="comment" style={{ textAlign: "left", borderStyle: "solid", margin: "auto", border: "3px solid #73AD21", padding: "10px", backgroundColor: "lightblue" }} />
          <p />
          {this.state.loggedIn && <button type="submit" id="2" className="btn btn-success" onClick={this.add}>
              Skicka kommentar
            </button>}
          <p />
          <div className="chat" style={{ textAlign: "left", borderStyle: "solid", margin: "auto", width: "60%", border: "3px solid #73AD21", padding: "10px", backgroundColor: "lightblue" }}>
            {todoList2}

            {/* {this.state.value}   {todoList2} */}
            {/* {chatCon} * {petList}*  {yyy}*/}
          </div>
        </Container>

        <Footer />
      </div>;
  }
}
/*
function isAdmin(obj){
  
    // for (var prop in obj) {
    //   console.log(`obj.${prop} = ${obj[prop]}`);
    // }
    if(obj!==undefined)
    var hejsan= Object.keys(obj).map(k => obj[k]);
    if(hejsan!==undefined)
    console.log( hejsan[1]);
    return hejsan;
  
  }


 function List({ arrayOfItems }) {
  return (
    <ul>
      { arrayOfItems.map( item =>
          <li key={ item.id }>{ item.name }</li>
      )}
    </ul>
  );
}


function TodosList(props) {

}
*/



function UserToRemove(props) {
  return <div><p>{props.email}
       <button onClick={() => props.onClick(props)}>
              Remove User
            </button></p>
  </div>;
}

function UserIsAdmin(props) {
  return <div><p>
       <button onClick={() => props.onClick(props)}>
              Admin
            </button>{props.value.toString()}
            </p>
  </div>;
}

// function UserItem(props) {
//   return <div><p>{props.email}
//        <button onClick={() => props.onClick(props)}>
//               Remove User
//             </button></p>
//             <button onClick={() => props.onClick(props)}>
//               Admin
//             </button>
//             {props.value}
//   </div>;
// }



function ListItem(props) {
  return <p>{props.value}</p>;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    error: state.error,
    user: state.user
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
