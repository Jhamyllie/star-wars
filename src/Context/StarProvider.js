import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import myContext from './StarContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planetFilter, setPlanetFilter] = useState([]);
  const contextValue = {
    data,
    setData,
    planetFilter,
    setPlanetFilter,
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dados = await response.json();
      setData(dados.results);
      setPlanetFilter(dados.results);
    };
    fetchPlanets();
  }, []);

  // eu tenho que usar a função (Provider) e não o nome do componente (StarProvider)

  return (
    <myContext.Provider value={ contextValue }>
      {children}
    </myContext.Provider>
  );
}
export default Provider;

Provider.propTypes = {
  children: Proptypes.node.isRequired,
};
