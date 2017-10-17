import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';
import * as actions from '../actions/actions';
import '../App.css';
import Jumbotron from './Jumbotron';
import Footer from './Footer';
import Container from './Container';
//import Navbar from './Navbar';
import firebase from '../firebase';
/* Good news, the logic in the component is basically the same!
 * It is the actions that need updating! We are creating our own API in our actions :)
 */

class App extends Component {
  state = {
    text: "",
    email: "",
    password: "",
    user: ""
  };

  componentDidMount() {
    //We want to fetch them all! Like with the movies
    this.props.fetchTodos();
    this.props.userChanged();
    // this.props.getUserValue();
  }

  add = () => {
    //No need for the random ID, just send these values
    this.props.addTodo({
      text: this.state.value,
      completed: false,
      email: this.state.email
    });
    this.setState({ value: "" });
    
  };

  remove = todo => {
    this.props.removeTodo(todo);
  };

  edit = todo => {
    const editedTodo = Object.assign({}, todo, { text: this.state.value });
    this.props.editTodo(editedTodo);
  };

  toggleCompleted = todo => {
    this.props.toggleCompleted(todo);
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
          text: ""
        };
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set(newUser);
      });
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
    // .then(getUserValue(user.mail));
    // .then(user=>console.log("tjena! "+user.email));
    //.then(user=>this.setState({ email: user.email }));
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log("hejsan " + user.email);
    //   } else {
    //     console.log("hej då");
    //   }
    // });
  };

  signOut = () => {
    firebase.auth().signOut();
  };
  getUserValue = () => {
    //console.log("hejsan"+this.state.text);
    /*
    var user = firebase.auth().currentUser;
    
    if (user) {
      console.log("ett "+user.email);
      this.setState({ email: user.email });
      console.log("hejsan"+user.email);
    } else {
      // No user is signed in.
    }
   */
  var text = this.state.value;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("hejsan " + user.email);
        //console.log("värde "+this.props.value);
        firebase
        .database()
        .ref(`users/${user.uid}`)
        . set ({ email: user.email, isAdmin: false, text  });
       
      } else {
        console.log("hej då");
      }
    });

  };
 
  render() {
    // const yyy = this.props.user.map(user => (
    //   <div key={user.key}>
    //     <p>{user.email}</p>
    //     </div>
    //   ));
    //console.log("blabla "+ this.state.email);
    //Both state and our functions are stored in props, redux state is synced to props
    const todoList = this.props.todos.map(todo => (
      <div key={todo.key}>
        <p>{todo.text}</p>
        <p>{todo.completed ? "Completed" : "Not Completed"} </p>
        <button className="button" onClick={() => this.remove(todo)}>
          {" "}
          Remove Todo{" "}
        </button>
        <button className="button" onClick={() => this.toggleCompleted(todo)}>
          {" "}
          Toggle completed{" "}
        </button>
        <button className="button" onClick={() => this.edit(todo)}>
          {" "}
          Edit Todo{" "}
        </button>
      </div>
    ));

    return (
      <div className="App">
        {/* {this.state.user && this.state.user.email} */}
        {/* <Navbar /> */}

        <form onSubmit={this.register}>
          <input
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
          />
          <input
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
          />
          <input className="button" type="submit" value="Register" />
        </form>
        <button className="button" onClick={this.signIn}>
          {" "}
          logga in{" "}
        </button>
        <button className="button" onClick={this.signOut}>
          {" "}
          Logga ut{" "}
        </button>
        <Jumbotron />
        <button className="button" onClick={this.getUserValue}>
          hämta
        </button>

        <Container>
          <div className="row">
            <figure className="col-xs-4">
              <p className="mqtx">Birdy</p>
              <img
                id="bild"
                src={require("./birdy3D.png")}
                className="img-rounded"
                alt="Birdy2"
                width="384"
                height="384"
              />
            </figure>
            <main>
              <h3>Hello, on this site you will find some cool games! </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                nisl ipsum, luctus rutrum tellus vel, mollis fringilla mauris.
                Nullam sagittis tristique arcu, vel euismod urna elementum ac.
                Fusce in tortor ac mauris elementum porttitor. Interdum et
                malesuada fames ac ante ipsum primis in
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
          {/* {yyy}{" hej"} */}

          {/* <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button className="button" onClick={this.add}> Add Todo </button> */}
          <textarea
            placeholder="Din kommentar (logga in först!)"
            type="text"
            onChange={this.onChange}
            name="value"
            value={this.state.value}
            className="form-control"
            rows="10"
            id="comment"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              width: "60%",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          />
          <p />
          <button type="submit" className="btn btn-success" onClick={this.getUserValue}>
            Skicka kommentar
          </button>
          <p />
          <div
            className="chat"
            style={{
              textAlign: "left",
              borderStyle: "solid",
              margin: "auto",
              width: "60%",
              border: "3px solid #73AD21",
              padding: "10px",
              backgroundColor: "lightblue"
            }}
          >
            {todoList}{" "}
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}



function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)    
}


function mapStateToProps(state){
  return {
    todos: state.todos,
    error: state.error,
    user: state.user
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);