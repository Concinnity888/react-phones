import React from 'react';
import './App.css';
import PhonesList from './components/PhonesList';
import Form from './components/Form';

function App() {
  return (
    <div className='App'>
      <div className='App__container'>
        <Form />
        <PhonesList />
      </div>
    </div>
  );
}

export default App;
