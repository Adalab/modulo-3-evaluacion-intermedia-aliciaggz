import '../styles/App.css';
import { useEffect, useState } from 'react';
import getData from '../services/api';

function App() {
  const [data, setData] = useState([]);
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    tutor: '',
    speciality: '',
  });

  const [search, setSearch] = useState('');

  //API CON EFFECT
  useEffect(() => {
    getData().then((adalaber) => {
      setData(adalaber);
    });
  }, []);

  console.log(data);

  //Handle

  const handleSearchAdalaber = (ev) => {
    setSearch(ev.currentTarget.value);
  };

  const handleChangeNewAdalaber = (ev) => {
    setNewAdalaber({
      ...newAdalaber,
      [ev.currentTarget.id]: ev.currentTarget.value,
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newAdalaber]);

    setNewAdalaber({
      name: '',
      tutor: '',
      speciality: '',
    });
  };

  //paint table

  const htmlAdalaber = data
    .filter((eachAdalaber) =>
      eachAdalaber.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((adalaber) => (
      <tr key={adalaber.id}>
        <td>{adalaber.name}</td>
        <td>{adalaber.tutor}</td>
        <td>{adalaber.speciality}</td>
      </tr>
    ));

  return (
    <div>
      <header>Adalabers</header>
      <form>
        <input
          type="search"
          name="search"
          placerholder="Ej: Mari Carmen"
          value={search}
          onChange={handleSearchAdalaber}
        />
      </form>
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
        <form>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newAdalaber.name}
            onChange={handleChangeNewAdalaber}
          />
          <label htmlFor="">Tutora</label>
          <input
            type="text"
            name="tutor"
            id="tutor"
            value={newAdalaber.tutor}
            onChange={handleChangeNewAdalaber}
          />
          <label htmlFor="">Especialidad</label>
          <input
            type="text"
            name="speciality"
            id="speciality"
            value={newAdalaber.speciality}
            onChange={handleChangeNewAdalaber}
          />
          <input
            type="submit"
            value="Añadir una nueva Adalaber"
            onClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
