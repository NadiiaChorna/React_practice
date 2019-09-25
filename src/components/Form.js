import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {
  const [value, setValue] = useState('');
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = event => {
      event.preventDefault();

      if(value.trim()) {
        firebase.addNote(value.trim())
          .then(()=>alert.show('The note have been created', 'success'))
          .catch(()=>alert.show('Something went wrong', 'danger'));
        setValue('');
      } else {
        alert.show('Please, enter your note');
      }
      
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="form-goup">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your note here"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  )
};