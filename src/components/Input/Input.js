import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ""
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        // value={enteredEmail}
        value={props.value}
        onChange={props.Onchange}
        onBlur={props.OnBlur}
      />
    </div>
  );
};
export default Input;
