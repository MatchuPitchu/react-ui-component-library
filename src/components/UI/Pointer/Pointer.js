import classes from './Pointer.module.css';

const Pointer = () => {
  return (
    <a href='#text' className={classes.scroll}>
      <div className={classes.pointer}>
        <span></span>
      </div>
    </a>
  );
};

export default Pointer;
