import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import myContext from './StarContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planetFilter, setPlanetFilter] = useState([]);
  const [namePlanet, setNamePlanet] = useState('');
  // aplicando filtro numérico
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [buttonValue, setButtonValue] = useState(0);
  const [filterNumber, setFilterNumber] = useState([]);
  const coluna = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [arraySelect, setArraySelect] = useState(coluna);
  const contextValue = {
    data,
    setData,
    planetFilter,
    setPlanetFilter,
    filterNumber,
    setFilterNumber,
    columnFilter,
    setColumnFilter,
    comparison,
    setComparison,
    buttonValue,
    setButtonValue,
    namePlanet,
    setNamePlanet,
    arraySelect,
    setArraySelect,
    // verificaFiltro,
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

  useEffect(() => {
    const planetaFiltrado = data.filter((planet) => planet.name.toLowerCase()
      .includes(namePlanet));

    const resultFilter = filterNumber.reduce((acc, filter) => acc
      .filter((planet) => {
        console.log(planet[filter.columnFilter]);
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.columnFilter]) > Number(filter.buttonValue);
        case 'menor que':
          return Number(planet[filter.columnFilter]) < Number(filter.buttonValue);
        case 'igual a':
          return Number(planet[filter.columnFilter]) === Number(filter.buttonValue);
        default:
          return true;
        }
      }), planetaFiltrado);

    setPlanetFilter(resultFilter);
  }, [data, namePlanet, filterNumber]);

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
