import '../styles/App.scss';
import { useEffect, useState } from 'react';
import getData from '../services/api';

function App() {
  const [data, setData] = useState([]);
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    tutor: '',
    speciality: '',
    social: '',
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
      social: '',
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
    .map((adalaber, index) => {
      if (adalaber.social === '') {
        return (
          <tr className="page__table--tr" key={(adalaber.id, index)}>
            <td className="page__table--td">{adalaber.name}</td>
            <td className="page__table--td">{adalaber.tutor}</td>
            <td className="page__table--td">{adalaber.speciality}</td>

            <td className="page__table--td"></td>
          </tr>
        );
      } else {
        return (
          <tr className="page__table--tr" key={(adalaber.id, index)}>
            <td className="page__table--td">{adalaber.name}</td>
            <td className="page__table--td">{adalaber.tutor}</td>
            <td className="page__table--td">{adalaber.speciality}</td>

            <td className="page__table--td">
              <a href={adalaber.social.map((eachObject) => eachObject.url)}>
                {adalaber.social.map((eachObject) => eachObject.name)}
              </a>
            </td>
          </tr>
        );
      }
    });

  return (
    <div className="page">
      <header className="page__header">Adalabers</header>
      <div className="page__container">
        <div className="page__container--filter">
          <form className="page__form">
            <label htmlFor="name">Nombre: </label>
            <input
              type="search"
              name="search"
              placerholder="Ej: Mari Carmen"
              value={search}
              onChange={handleSearchAdalaber}
            />
          </form>
          <form className="page__form">
            <label htmlFor="">Escoge una Tutora: </label>
            <select name="" id="" onChange={handleFilter}>
              <option value="all">Escoge una opcion</option>
              <option value="yanelis">Yanelis</option>
              <option value="dayana">Dayana</option>
              <option value="ivan">Ivan</option>
            </select>
          </form>
        </div>
        <div className="page__add">
          <h2 className="page__header2">Añadir una Adalaber</h2>
          <form className="page__form2">
            <label htmlFor="" className="page__form2--label">
              Nombre:
            </label>
            <input
              className="page__form2--input"
              type="text"
              name="name"
              id="name"
              value={newAdalaber.name}
              onChange={handleChangeNewAdalaber}
            />
            <label htmlFor="" className="page__form2--label">
              Tutora
            </label>
            <input
              className="page__form2--input"
              type="text"
              name="tutor"
              id="tutor"
              value={newAdalaber.tutor}
              onChange={handleChangeNewAdalaber}
            />
            <label className="page__form2--label" htmlFor="">
              Especialidad
            </label>
            <input
              className="page__form2--input"
              type="text"
              name="speciality"
              id="speciality"
              value={newAdalaber.speciality}
              onChange={handleChangeNewAdalaber}
            />
            <input
              className="page__form2--btn"
              type="submit"
              value="Añadir una nueva Adalaber"
              onClick={handleClick}
            />
          </form>
        </div>
      </div>
      <table className="page__table">
        <thead className="page__table--head">
          <tr className="page__table--tr">
            <th className="page__table--th">Nombre</th>
            <th className="page__table--th">Tutora</th>
            <th className="page__table--th">Especialidad</th>
            <th className="page__table--th">Redes</th>
          </tr>
        </thead>
        <tbody className="page__table--body">{htmlAdalaber}</tbody>
      </table>
    </div>
  );
}

export default App;
