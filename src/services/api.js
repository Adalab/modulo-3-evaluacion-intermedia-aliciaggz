const getData = () => {
  return fetch(
    'https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data.results.map((adalaber, i) => {
        return {
          id: adalaber.id,
          name: adalaber.name,
          tutor: adalaber.counselor,
          speciality: adalaber.speciality,
          social: adalaber.social_networks,
        };
      });
      // Retornamos los resultados del API al componente App
      return result;
    });
};

export default getData;
