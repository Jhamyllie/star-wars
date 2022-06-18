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
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dados = await response.json();
      const dadosOrdenados = dados.results.sort((x, y) => {
        const number = -1;
        if (x.name < y.name) {
          return number;
        }
        return true;
      });
      // aqui já passa os planetas ordenados(requisito 07)
      setData(dadosOrdenados);
      setPlanetFilter(dadosOrdenados);
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
  // requisito 7
  const controlInputRadio = ({ target }) => {
    setOrder({ ...order, sort: target.value });
  };

  const ordenarTabela = () => {
    const valorUnknown = planetFilter
      .filter((elemento) => elemento[order.column] === 'unknown');

    const valorNotUnknown = planetFilter
      .filter((elemento) => elemento[order.column] !== 'unknown');

    const orderDescAndAsc = valorNotUnknown.concat(valorUnknown).sort((x, y) => {
      if (order.sort === 'ASC') {
        return x[order.column] - y[order.column];
      }
      return y[order.column] - x[order.column];
    });
    setPlanetFilter(orderDescAndAsc);
  };

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
    setOrder,
    order,
    controlInputRadio,
    ordenarTabela,
  };
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
