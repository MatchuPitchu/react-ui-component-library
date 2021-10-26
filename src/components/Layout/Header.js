import { Fragment } from 'react';
import HeaderBtn from './HeaderBtn';
import classes from './Header.module.css';

const Header = ({ onShowCart }) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>UI Components</h1>
        <HeaderBtn onClick={onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
