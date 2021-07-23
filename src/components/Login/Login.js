import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//reducer function can be located outside of the component function
const emailReducer = (state, action) =>{
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@')}
  }
  return {value:'', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  })

  //useEffect is used commonly with persistence, http requests, timers etc (akin to watchers and computed props in Vue?)

  //use useEffect when something needs to change when something is updated (ie compone being loaded, email updated)
  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500)
    
  //   //honestly, just refer back to module 10 lesson 113 at 4:50 mark
  //   return () => {
  //     clearTimeout(identifier)
  //   };
  //   //the array watches any of these pointers included, if none of these dependencies 
  //   //changed, useEffect will not be rerun

  //   //do not need to include setters, they never change they can be omitted
  // },[enteredEmail,enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6 
    )
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({
      type: 'INPUT_BLUR',

    })
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
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
