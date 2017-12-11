import React from "react";
export default function Uservalue(props) {
  const styles = {
    color: "blue"
  };
  const styles2 = {
    color: "green"
  };
  const styles3 = {
    color: "red"
  };
  if (props.value === true){
    return (
      <div>
        <p style={styles}>
          User is Admin
          <button id="myButt4" onClick={() => props.onClick(props)}>
            {props.title}
          </button>
        </p>
      </div>
    );
  }
  else if (props.value === false){
    return (
      <div>
        <p style={styles2}>
          Not Admin
          <button id="myButt5" onClick={() => props.onClick(props)}>
            {props.title}
          </button>
        </p>
      </div>
    );
  }
  else{
    return (
      <div>
        <p style={styles3}>
          {props.value.toString()}
          <button id="myButt6" onClick={() => props.onClick(props)}>
            {props.title}
          </button>
        </p>
      </div>
    );
  }
}
