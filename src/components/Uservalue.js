import React from "react";
export default function Uservalue(props) {
  return (
    <div>
      <p>
        {props.value.toString()}
        <button onClick={() => props.onClick(props)}>{props.title}</button>
      </p>
    </div>
  );
}
