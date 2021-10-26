import { useState } from 'react';
import Header from './components/Layout/Header';
import Card from './components/UI/Card/Card';
import Form from './components/UI/Form/Form';
import Pointer from './components/UI/Pointer/Pointer';
import Button from './components/UI/Button/Button';

import classes from './App.module.css';
import Modal from './components/UI/Modal/Modal';
import ErrorModal from './components/UI/Modal/ErrorModal';
import FormLogin from './components/UI/Form/FormLogin';

const DATA = [
  {
    id: '1',
    name: 'Test1',
    description: 'Description1',
  },
  {
    id: '2',
    name: 'Test2',
    description: 'Description2',
  },
];

const App = () => {
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);

  const errorHandler = () => setError(null); // null is falsy value
  const showModalHandler = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  return (
    <>
      {/* Error Modal */}
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}

      {/* Content Modal */}
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <div className={classes.actions}>
            <h2>Modal Component with React Portal</h2>
            <button className={classes['button--alt']} onClick={hideModalHandler}>
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Header */}
      <Header onShowCart={showModalHandler} />
      <main className={classes.container}>
        {/* Simple Card UI Component */}
        <section className={classes.section}>
          <Card>
            <h1>Simple Card Component</h1>
          </Card>
        </section>

        {/* Card UI Component with Form and UI Input Component*/}
        <section className={classes.section}>
          <Card>
            <h1>Card Component with Form and UI Input Components</h1>
            <ul>
              {DATA.map(item => (
                <li key={item.id} className={classes.item}>
                  <Form id={item.id} />
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className={classes.section}>
          <Card className={classes.login}>
            <h1>
              Login Form + Input validation when focus is losed + focus input field automatically
              when invalid after click login button
            </h1>
            <FormLogin />
          </Card>
        </section>

        <section className={classes.section}>
          {/* Pointer UI Component */}
          <h1>Pointer</h1>
          <Pointer />

          {/* Button UI Component */}
          <h1>Button</h1>
          <Button>Click</Button>
        </section>
      </main>
    </>
  );
};

export default App;
