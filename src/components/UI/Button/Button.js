import classes from './Button.module.css';

const Button = props => {
  return (
    <div className={classes['btn-container']}>
      <button
        type={props.type || 'button'}
        className={`${classes.btn} ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        <svg width='180px' height='60px' viewBox='0 0 180 60'>
          <polyline points='179,1 179,59 1,59 1,1 179,1'></polyline>
          <polyline points='179,1 179,59 1,59 1,1 179,1'></polyline>
        </svg>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
