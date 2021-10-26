import { useState } from 'react';
import CartIcon from '../Icons/CartIcon';
import classes from './HeaderBtn.module.css';

const HeaderBtn = ({ onClick }) => {
  const [btnBump, setBtnBump] = useState(false);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;

  return (
    <button
      className={btnClasses}
      onClick={() => {
        onClick();
        setBtnBump(true);
        setTimeout(() => setBtnBump(false), 300);
      }}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
    </button>
  );
};

export default HeaderBtn;
