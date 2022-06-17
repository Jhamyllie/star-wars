import React, { useContext } from 'react';
import StarContext from './Context/StarContext';

function Table() {
  const { planetFilter,
    setNamePlanet,
    columnFilter,
    comparison,
    buttonValue,
    setButtonValue,
    setColumnFilter,
    setComparison,
    filterNumber,
    setFilterNumber,
    arraySelect,
    setArraySelect,
  } = useContext(StarContext);

  const handleText = ({ target }) => {
    setNamePlanet(target.value);
  };

  const verificaFiltro = () => {
    const novasOpcoes = arraySelect.filter((option) => option !== columnFilter);
    setArraySelect(novasOpcoes);
  };
  // aplicando múltiplos filtros
  const buttonFilterValue = () => {
    const newFilterNumber = {
      columnFilter,
      comparison,
      buttonValue,
    };
    setFilterNumber([...filterNumber, newFilterNumber]);
    verificaFiltro();
    // console.log('columnFilter', columnFilter);
    // console.log('comparison', comparison);
    // console.log('buttonValue', buttonValue);
  };

  const deleteFilters = () => {
    setFilterNumber([]);
  };

  const deletFilter = (index) => {
    setFilterNumber(filterNumber.filter((_item, itemIndex) => itemIndex !== index));
  };
  // console.log(data);
  return (
    <div>
      <div>
        <h1>Star Wars</h1>
        <label htmlFor="name-filter">
          Planeta
          <input
            data-testid="name-filter"
            type="text"
            id="name-filter"
            placeholder="Insira um planeta"
            onChange={ handleText }
          />
        </label>
      </div>

      <form className="form">
        <label htmlFor="column-filter">
          Column
          <select
            data-testid="column-filter"
            value={ columnFilter }
            id="column-filter"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            {arraySelect.map((coluna) => <option key={ coluna }>{coluna}</option>)}

          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operator
          <select
            data-testid="comparison-filter"
            value={ comparison }
            id="comparison-filter"
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Value
          <input
            value={ buttonValue }
            type="number"
            placeholder="0"
            id="value-filter"
            data-testid="value-filter"
            onChange={ ({ target }) => setButtonValue(target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          placeholder="Filtro"
          type="button"
          onClick={ buttonFilterValue }
        >
          Filtro
        </button>
        {/* requisito 07 */}
        <label htmlFor="planet-name">
          Order
          <select
            data-testid="column-sort"
            value={ columnFilter }
            id="planet-name"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            {arraySelect.map((coluna) => <option key={ coluna }>{coluna}</option>)}

          </select>
          {/* <select data-testid="planet-name">
            <option>Population</option>
            <option>orbital-period</option>
            <option>diameter</option>
            <option>rotation-period</option>
            <option>sufarce-water</option>
          </select> */}
        </label>
        <label htmlFor="asc-input">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            value="Asc"
            id="asc-input"
          />
          Ascendente
        </label>
        <label htmlFor="desc-input">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            value="Desc"
            id="desc-input"
          />
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          type="submit"
        >
          Ordenar
        </button>
        {/* Requisito 07, final aqui */}
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ deleteFilters }
        >
          Deletar filtros
        </button>
      </form>
      {filterNumber.map((filter, index) => (
        <p
          key={ `${filter.columnFilter}-${index}` }
          // onClick={ () => deletFilter(index) }
          data-testid="filter"
        >
          {`${filter.columnFilter}
        ${filter.comparison}
        ${filter.buttonValue}`}
          <button
            type="button"
            onClick={ () => deletFilter(index) }
          >
            X
          </button>
        </p>))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>

        <tbody>
          { planetFilter.map((element) => (
            <tr key={ element.name }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films.map((film) => film.name)}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

// "name": "Tatooine",
// "rotation_period": "23",
// "orbital_period": "304",
// "diameter": "10465",
// "climate": "arid",
// "gravity": "1 standard",
// "terrain": "desert",
// "surface_water": "1",
// "population": "200000",
// films": [
// ],
// "created": "2014-12-09T13:50:49.641000Z",
// "edited": "2014-12-20T20:58:18.411000Z",
// "url":

/* <label htmlFor="name-filter">
          filter type
          <select>
            <option>name</option>
          </select>
        </label> */
