import { useRef, useState } from 'react';
import Button from '../Button/Button';
import InputSimple from '../Input/InputSimple';

import classes from './Form.module.css';

const Form = ({ id }) => {
  const [amountValid, setAmountValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();
    // value is always string even if input type is number, remove empty spaces and convert to num with +
    const enteredAmount = +amountInputRef.current.value.trim();
    // input validation check
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountValid(false);
      return;
    }
    // Do smth with data
    console.log('User input: ', enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <InputSimple
        ref={amountInputRef} // forwardRef in Input component needed to make ref work
        label='Amount'
        input={{
          id: `amount_${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <Button type='submit'>+ Add</Button>
      {!amountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default Form;
