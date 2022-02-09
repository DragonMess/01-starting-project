import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// reducerFunction
const emailReducer = (state, action) => {
  // return newState
  if (action.type === "USER_INPUT_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR_EMAIL") {
    // return { value: last state , isValid: state.value.includes("@") };
    return { value: state.value, isValid: state.value.includes("@") };
  }
  // if the others if not true pass a initial state
  return { value: "", isValid: false };
};

const initialEmailState = { value: "", isValid: false };

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT_PW") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR_PW") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const initialPasswordState = { value: "", isValid: false };

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );
  // object destucturing
  // emailState = { value: "some@email.com", isValid: true }
  // const { isValid: emailIsValid } = emailState;
  // emailIsValid is an Alias asignement
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("cheking validity");
      // setFormIsValid(emailState.isValid && passwordState.isValid);
      setFormIsValid(emailIsValid && passwordIsValid);
      console.log(passwordIsValid, "passwordIsValid");
      console.log(emailIsValid, "emailIsValid");
      console.log(emailIsValid && passwordIsValid, "isvalid ?");
      console.log(formIsValid, "formIsValid");
    }, 500);
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
    // }, [emailState, passwordState]);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value });

    // setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6);

    // puted inside useEffect
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT_PW", val: event.target.value });
    setFormIsValid();
    // enteredEmail.includes("@") && event.target.value.trim().length > 6
    // puted inside useEffect
    // emailState.isValid && passwordState.isValid
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(event.target.includes("@"));
    // input lost focus (don't need a value in dispatch object)
    dispatchEmail({ type: "INPUT_BLUR_EMAIL" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR_PW" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ""
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
