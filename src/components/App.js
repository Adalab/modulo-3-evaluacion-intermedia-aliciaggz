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

  const [selectOptions, setSelectOptions] = useState('all');

  //API CON EFFECT
  useEffect(() => {
    getData().then((adalaber) => {
      setData(adalaber);
    });
  }, []);

  console.log(data);

  //Handle

  const handleFilter = (ev) => {
    setSelectOptions(ev.currentTarget.value);
  };

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
    .filter((eachAdalaber) => {
      if (selectOptions === 'yanelis') {
        return eachAdalaber.tutor === 'Yanelis';
      } else if (selectOptions === 'dayana') {
        return eachAdalaber.tutor === 'Dayana';
      } else if (selectOptions === 'ivan') {
        return eachAdalaber.tutor === 'Iván';
      } else {
        return eachAdalaber;
      }
    })
    .map((adalaber, index) => (
      <tr key={(adalaber.id, index)}>
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
      <select name="" id="" onChange={handleFilter}>
        <option value="all">Escoge una opcion</option>
        <option value="yanelis">Yanelis</option>
        <option value="dayana">Dayana</option>
        <option value="ivan">Ivan</option>
      </select>
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
