import '../styles/App.css';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import getData from '../services/api';

function App() {
  // Llamar al api con useEffect

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h1>Hola Mundo</h1>
    </div>
  );
}

export default App;
