import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
import "../App.css";
import Jumbotron from "./Jumbotron";
import Footer from "./Footer";
//import Container from "./Container";
import SiteContent from "./SiteContent";
//import Navbar from "./Navbar";
//import firebase from "../firebase";
//import Input from "./Input";
//import Modal from "./Modal";
//import ToggleCheckbox from "./ToggleCheckbox";
//import Uservalue from "./Uservalue";
import LoginForm from './LoginForm';
import UserList from './UserList';
import Chat from './Chat';
/* Good news, the logic in the component is basically the same!
 * It is the actions that need updating! We are creating our own API in our actions :)
 */

class App extends Component {
  state = {
    text: "",
    email: "",
    password: "",
    userUid: "",
    isAdmin: true,
    // user:undefined,
    //loggedIn: undefined,
    //number: 1
    value: "",
    signInOrUp: true,
    inlog: ""
  };

  componentDidMount() {
    //We want to fetch them all! Like with the movies
    //this.props.fetchTodos();
    // this.props.fetchUser();
    //One listener for every item added
    this.props.addTodoListener();
    
    this.props.removeTodoListener();
    //One listener for every change in ever item, listens to ANY change
    this.props.changeTodoListener();
    //Listens to which item is being removed
    this.props.changeUserListener();
    this.props.addUserListener();
    this.props.removeUserListener();
    this.props.userData();


    //this.props.userChanged();
  //  this.getIdOfUser();
  //  this.props.changeUserListener();
  //  this.props.addUserListener();
  //  this.props.removeUserListener();
 //this.props.userData();
 //this.currentUserData(); 
  }


  // add = e => {
  //   //console.log(e.target.id);
  //   //No need for the random ID, just send these values
  //   this.props.addTodo({
  //     text: this.state.value,
  //     // completed: false,
  //     postNo: e.target.id,
  //     createdBy: this.props.datas.uid
  //   });
  //   this.setState({ value: "" });
  //   // this.refs.someName.value = '';
  // };
/*
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
*/
//verka rju inte köras?

// currentUserData = () => {
//   if(this.props.datas.uid!==undefined)
//   {
//     let user = this.props.datas;
//     this.setState({ userUid: user.uid, 
//       email: user.email });
//    //  this.getValueofUser(this.state.userUid);
//    console.log("hej på dej! "+this.state.userUid+" "+this.state.email);
//    console.log("hej "+this.props.datas);
//   }

// }
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

  // remove = todo => {
  //   this.props.removeTodo(todo);
  // };
  // // removeUser = user => {
  // //   this.props.removeUsers(user);
  // //   //(alert("hej"));
  // // };

  // //getAllusers = user => {};

  // edit = todo => {
  //   const editedTodo = Object.assign({}, todo, { text: this.state.value });
  //   this.props.editTodo(editedTodo);
  // };

  // // toggleCompleted = user => {
  // //   this.props.toggleCompleted(user);
  // // };

  // onChange = e => this.setState({ [e.target.name]: e.target.value });

  // register = e => {
  //   e.preventDefault();
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //     .then(user => {
  //       const newUser = {
  //         email: user.email,
  //         isAdmin: false,
  //         posts: ""
  //       };
  //       if (user !== null)
  //         firebase
  //           .database()
  //           .ref(`users/${user.uid}`)
  //           .set(newUser);
  //         //  .then(this.setState({ loggedIn: true }));
     
  //     });

  // };

//   signIn = e => {
//     e.preventDefault();
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(this.state.email, this.state.password);
//    //   .then(console.log(e.target.value));
//    //  .then(this.setState({ loggedIn: true }));

//     // .then(this.currentUserData());
//    //  this.getIdOfUser();
   
//    //this.props.isAdmin(id.uid);
//    //this.currentUserData();

//    // this.props.userChanged();
//   // this.isAdminA(this.props.user);
//  // console.log(this.props.datas);
//   };



  // setOption = (event) => {

  //   if(this.state.signInOrUp)
  //   this.setState({ signInOrUp: false })
  //   else
  //   this.setState({ signInOrUp: true })
  // }


isAdminA = () => {
  //if(this.props.user[0]!==undefined && this.props.datas.uid!==undefined) {
  
    if(this.props.user!==undefined && this.props.datas.uid!==undefined && this.state.isAdmin===undefined)
    {
      let obj = this.props.user.find(o => o.key === this.props.datas.uid);
      if(obj!==undefined) {
      var adm = obj.isAdmin;
       this.setState({ isAdmin: adm })
      }
   }


  //   if(user!==undefined && id!==undefined){
  // //  var user = this.props.user;
  // //  var id = this.props.datas.uid;
  //   let obj = user.find(o => o.key === id);
  //   let adm = obj.isAdmin;
   
  //  this.setState({ isAdmin: adm })
  // }
}


  render() {
    this.isAdminA(); 

  // console.log("sam "+this.props.datas.uid);
 // console.log(yyy);

    //var array=this.props.user;
    //if(array!=undefined || array!=="" || array==null)
  //  console.log(array);
   //console.log("hej "+this.props.user.isAdmin);
// if(this.props.datas.uid!==undefined){

// this.props.isAdmin(this.props.datas.uid);
// var hej=this.props.isadmin;
// console.log("adm "+hej);
// }
  //array.find(x => x.name === 'string 1')

 // isAdmin(array);
 //isAdmin(this.props.user);
 //console.log(this.props.user);
 //console.log(this.props.datas.uid);

//  console.log("hej "+this.props.datas.email);
 
   //console.log(  this.props.datas.uid);

  //   var userList=undefined;
    
  //   if(this.props.datas.email){
  //   userList = this.props.user.map((user, k) => {
  //     if (this.state.isAdmin && user !== "") {
  //       return <div key={k}>
  //           <Uservalue value={user.email} title="Remove" onClick={() => this.props.removeUsers(user)} />
  //           <Uservalue value={user.isAdmin} title="Admin" onClick={() => this.toggleCompleted(user)} />
  //         </div>;
  //    } else return <div key={k}> </div>;
  //   });
  // }
    
  // if(this.state.loggedIn){
  //   userList = this.props.user.map((user, k) => {
  //     if (this.state.isAdmin && user !== "") {
  //       return <div key={k}>
  //           <Uservalue value={user.email} title="Remove" onClick={() => this.props.removeUsers(user)} />
  //           <Uservalue value={user.isAdmin} title="Admin" onClick={() => this.toggleCompleted(user)} />
  //         </div>;
  //     } else return <div key={k}> </div>;
  //   });
  // }


      // removeUser = user => {
  //   this.props.removeUsers(user);
  //   //(alert("hej"));
  // };
 
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

    // const todoList = this.props.todos.map((todo, k) => {
    //   // <ListItem key={todo.toString()}
    //   // value={todo} />
    //   if (
    //     todo.postNo === "3" &&
    //     (todo.createdBy === this.props.datas.uid || this.state.isAdmin)
    //   ) {
    //     return (
    //       <div key={k}>
    //         {todo.text}
    //         {/* {console.log(todo.postNo)} */}
    //         <button className="button" onClick={() => this.remove(todo)}>
    //           X
    //         </button>
    //         <button className="button" onClick={() => this.edit(todo)}>
    //           {" "}
    //           Edit{" "}
    //         </button>
    //       </div>
    //     );
    //   } else if (todo.postNo === "3") return <div key={k}>{todo.text} </div>;
    // });

    // const todoList2 = this.props.todos.map((todo, k) => {
    //   // if(this.state.number===1)

    //   //  if (todo.createdBy === this.state.userUid || this.state.isAdmin)
    //   if (
    //     todo.postNo === "2" &&
    //     (todo.createdBy === this.props.datas.uid|| this.state.isAdmin)
    //   ) {
    //     return (
    //       <div key={k}>
    //         {todo.text}
    //         {/* {console.log(todo.postNo)} */}
    //         <button className="button" onClick={() => this.remove(todo)}>
    //           X
    //         </button>
    //         <button className="button" onClick={() => this.edit(todo)}>
    //           {" "}
    //           Edit{" "}
    //         </button>
    //       </div>
    //     );
    //   } else if (todo.postNo === "2") return <div key={k}>{todo.text} </div>;
    // });
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

        <LoginForm signIn={this.props.signIn} signOut={this.props.signOut}/>
        <Jumbotron />
        {/* <button className="button" onClick={this.getValueofUser}>
          hämta
        </button> */}
        <div><UserList/></div>

     <SiteContent />
<Chat />

        <Footer />
      </div>;
  }
}

// function isLoggedIn(user){
//   if (user) {
//     return true;
//   } else {
//     return false
//   }
// }


// function isAdmin(user, id ){
// // console.log(id);

//  let obj = user.find(o => o.key === id);
// let adm = obj.isAdmin;
// //console.log(adm);
// return adm;
    // for (var prop in obj) {
    //   console.log(`obj.${prop} = ${obj[prop]}`);
    // }
 //   let kkk =undefined;
//  let plupp="";
//     if(arr!==undefined)
//     var hejsan= Object.keys(arr).map(k => arr[k]);
    //if(hejsan!==undefined)
   // kkk = hejsan.find(o => o.isAdmin === true);
  //  for (var i = 0; i < arr.length; i++){
  //   plupp = arr[i].find(o => o.isAdmin=== true);
  //  }
   // console.log(hejsan);
    //return hejsan;
  
//  }
/*

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



// function UserToRemove(props) {
//   return <div><p>{props.email}
//        <button onClick={() => props.onClick(props)}>
//               Remove User
//             </button></p>
//   </div>;
// }

// function UserIsAdmin(props) {
//   return <div><p>
//        <button onClick={() => props.onClick(props)}>
//               Admin
//             </button>{props.value.toString()}
//             </p>
//   </div>;
// }

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



// function ListItem(props) {
//   return <p>{props.value}</p>;
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    error: state.error,
    user: state.user,
    datas: state.datas,
    isadmin: state.isadmin
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
