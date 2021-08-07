import React from "react";

const ToDoLists = (props) => {
  return (
    <>
      <li>
        <span id="cross" className="px-2" onClick={() => props.onSelect(props.text)}>
          X 
        </span>
        {props.text}
      </li>
      {/* </div> */}
    </>
  );
};

export default ToDoLists;
