import '../styles/App.css';
import { useEffect, useState } from 'react';
import getData from '../services/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((adalaber) => {
      setData(adalaber);
    });
  }, []);

  console.log(data);

  //paint table

  const htmlAdalaber = data.map((adalaber) => (
    <tr key={adalaber.id}>
      <td>{adalaber.name}</td>
      <td>{adalaber.tutor}</td>
      <td>{adalaber.speciality}</td>
    </tr>
  ));

  return (
    <div>
      <header>Adalabers</header>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>{htmlAdalaber}</tbody>
      </table>

      <div>
        <h2>Añadir una Adalaber</h2>
        <label htmlFor="">Nombre:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="">Tutora</label>
        <input type="text" name="tutor" id="tutor" />
        <label htmlFor="">Especialidad</label>
        <input type="text" name="speciality" id="speciality" />
        <input type="submit" value="Añadir una nueva Adalaber" />
      </div>
    </div>
  );
}

export default App;
