import { useState, useEffect, useReducer, useRef } from 'react';
import classes from './FormLogin.module.css';

import Button from '../Button/Button';
import Card from '../Card/Card';
import InputLoseFocus from '../Input/InputLoseFocus';

// function expression outside of component because inside of reducer fn I don't need any
// data that is generated inside of the component fn
const emailReducer = (prevState, action) => {
  // condition defined based on action parameter and a related wished state update return
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    // it is guaranteed that prevState parameter is the last state snapshot
    return { value: prevState.value, isValid: prevState.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
  return { value: '', isValid: false };
};

const FormLogin = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer, // reducer function
    { value: '', isValid: null } // initial state
  );
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // in useEffect I need only valid values as the dependencies;
  // only if valid states change, useEffect reruns;
  // I use destructuring with aliases to extract the valid values
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    // debounce user input with setTimeout;
    // now validation is not executed on every key stroke
    const timerId = setTimeout(() => {
      // set to true if both conditions are true
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    // need clean up function for setTimeout that is executed BEFORE useEffect runs the next time
    // OR BEFORE the component is removed from the DOM (-> is unmounted);
    // save setTimeout above in variable and for next key stroke that's cleared
    // that I have only one ongoing timer at a time
    return () => clearTimeout(timerId);

    // set all changable variables as dependencies, useEffect reruns if one of them changes
  }, [emailIsValid, passwordIsValid]);

  // 1b) use case for useReducer
  const emailHandler = ({ target }) => {
    // dispatchFn of useReducer to pass an "action" as an argument (-> look at parameter of emailReducer fn);
    // here I'm using an obj with type key that describes what happpens AND a payload (-> here a value the user entered)
    dispatchEmail({
      type: 'USER_INPUT',
      val: target.value,
    });
  };

  const passwordHandler = ({ target }) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: target.value,
    });
  };

  // 1b) version with useReducer
  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_BLUR', // action happens when focus is blurred, so I call type 'INPUT_BLUR'
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const loginHandler = (email, password) => {
    // ... check email and password

    // save login status in browser storage;
    // both storage key and storage value have to be string
    localStorage.setItem('isLoggedIn', '1');

    // login user e.g. with useState -> setIsLoggedIn(true);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (formIsValid) {
      // 1b) with useReducer
      loginHandler(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      // in Input component defined focus fn focusses invalid input field
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputLoseFocus
          ref={emailRef}
          id='email'
          label='E-Mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailHandler}
          onBlur={validateEmailHandler}
        />
        <InputLoseFocus
          ref={passwordRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormLogin;
