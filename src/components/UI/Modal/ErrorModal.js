import { createPortal } from 'react-dom'; // import for createPortal method
import Button from '../Button/Button';
import Card from '../Card/Card';
import classes from './ErrorModal.module.css';

// onConfirm prop should be a function that resets error state to null
const Backdrop = ({ onConfirm }) => {
  return <div className={classes.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const portalEl = document.getElementById('error-modal');

const ErrorModal = ({ title, message, onConfirm }) => {
  return (
    <>
      {/* Backdrop Overlay and Modal moved up to show functionality of React Portals */}
      {/* <div className={classes.backdrop} onClick={onConfirm}></div> */}
      {/* <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <p>{message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={onConfirm}>Okay</Button>
        </footer>
      </Card> */}

      {/* 
        use createPortal method of React DOM library; 
        first argument is JSX React component that I wanna move somewhere 
        (-> important: pass props into this component);
        second argument is element in index.html that I get e.g. by id;
        now it doesn't matter where - in which deep nested component - I use Backdrop and Modal,
        it's always rendered attached to element with this id
      */}
      {createPortal(<Backdrop onConfirm={onConfirm} />, portalEl)}
      {createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        portalEl
      )}
    </>
  );
};

export default ErrorModal;
